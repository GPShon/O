// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";

// 使用插件
Vue.use(VueRouter);

import routes from './routes'
import store from '@/store'
// 重写push 和 replace 方法
//第一个参数:告诉原来push方法，你往哪里跳转（传递哪些参数)//第二个参数:成功回调
//第三个参数:失败的回调
// call || apply区别
//相同点，都可以调用函数一次，都可以篡改函数的上下文一次
//不同点: call与apply传递参数: call传递参数用逗号隔开，apply方法执行，传递数组

// 保存原始方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push
VueRouter.prototype.push = function (location, resolve, reject)
{
  if (resolve && reject)
  {
    originPush.call(this, location, resolve, reject);
  }
  else
  {
    originPush.call(this, location, () => {}, () => {});
  }
};
// 重写replace
VueRouter.prototype.replace = function (location, resolve, reject)
{
  if (resolve && reject)
  {
    originReplace.call(this, location, resolve, reject);
  }
  else
  {
    originReplace.call(this, location, () => {}, () => {});
  }
};

// 配置路由
let router = new VueRouter(
{
  // 配置路由
  routes,
  scrollBehavior(to, from, savedPosition)
  {
    // return 期望滚动到哪个的位置
    return { y: 0 }
  }
});

// 全局守卫 ：前置守卫（在路由之间跳转时判断）
router.beforeEach(async (to, from, next) =>
{
  // to 可以获取到你要跳转的路由信息
  // from 可以获取到你从哪里跳转的路由信息
  // next 放行函数 next()放行 next(path)放行到指定路由 next(false)驳回
  // next();
  let token = localStorage.getItem('token');
  // 用户信息
  let name = store.state.user.userInfo.name
  if (token) //用户登录
  {
    if (to.path == '/login' || to.path == '/register')
    {
      next('/home')
    }
    else
    {
      // 登录有信息
      if (name)
      {
        next()
      }
      else
      {
        // 没有信息，派发actions获取用户信息
        try
        {
          // 获取用户信息成功
          await store.dispatch('getUserInfo');
          next();
        }
        catch (error)
        {
          // token 失效 清除所有用户信息并返回登录界面
          await store.dispatch('QuitLogin');
          next('/login')
        }
      }
    }
  }
  else
  {

    let toPath = to.path;

    // if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
    //   next('/login')
    // }else{
    //   next()
    // }

    // 判断未登录时跳转的路由是否存在名单中的路径，如果存在则跳到登录页，不存在则放行
    if(['pay','trade','center'].every(item=>!toPath.includes(item))){
     next();
    }else{
      // 把未登录前期望跳转的路由路径保存在地址栏中
      next('/login?redirect='+toPath)
    }
  }
})


export default router