// 引入路由组件
// import Home from "../views/Home";
import Search from "../views/Search";
import Login from "../views/Login";
import Register from "../views/Register";
import Detail from "../views/Detail"
import AddCartSuccess from "../views/AddCartSuccess"
import ShopCart from "../views/ShopCart"
import Trade from '../views/Trade'
import Pay from '../views/Pay'
import PaySuccess from '../views/PaySuccess'
import Center from '../views/Center'
// 引入二级路由
import myOrder from "../views/Center/myOrder"
import groupOrder from "../views/Center/groupOrder"
/* 
  当打包构建应用时，JavaScript包会变得非常大,影响页面加载。
  如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
*/
export default [
  {
    name: 'center',
    path: '/center',
    component: Center,
    meta: { show: true },
    children:[
      {
        path:'myorder',
        component:myOrder
      },
      {
        path:'grouporder',
        component:groupOrder
      },
      {
        path:'/center',
        redirect:'/center/myorder'
      }
    ]
  },
  {
    name: 'paysuccess',
    path: '/paysuccess',
    component: PaySuccess,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter:(to,from,next)=>{
      if(from.path == '/pay'){
        next();
      }else{
        next(false)
      }
    }

  },
  {
    name: 'pay',
    path: '/pay',
    component: Pay,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter:(to,from,next)=>{
      if(from.path == '/trade'){
        next();
      }else{
        next(false)
      }
    }

  },
  {
    name: 'trade',
    path: '/trade',
    component: Trade,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter:(to,from,next)=>{
      if(from.path == '/shopcart'){
        next();
      }else{
        next(false)
      }
    }
  },
  {
    name: 'shopcart',
    path: '/shopcart',
    component: ShopCart,
    meta: { show: true }

  },
  {
    name: 'addcartsuccess',
    path: '/addcartsuccess',
    component: AddCartSuccess,
    meta: { show: true }

  },
  {
    name: 'detail',
    path: '/detail/:skuId',
    component: Detail,
    meta: { show: true }
  },
  {
    name: 'home',
    path: '/home',
    component:()=>import('@/views/Home'),
    meta: { show: true }
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: Search,
    meta: { show: true },
    // 布尔值写法
    // props: true,
    // 对象写法
    // props: { a: 1, b: 2 }
    // 函数写法,params参数和query参数通过props传递给路由组件
    // props: ($route) => {
    //     return {
    //         keyWord: $route.params.keyWord,
    //         k: $route.query.k
    //     };
    // }
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: { show: false }
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
    meta: { show: false }
  },
  // 重定向 , 在项目跑起来的时候，立马定向到首页
  {
    path: '*',
    redirect: '/home'
  }
]