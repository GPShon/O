import Vue from 'vue';
import App from './App.vue';

// 三级联动组件---全局组件
import TypeNav from "./components/TypeNav/index.vue";
import Carousel from "./components/Carousel/index.vue";
import Pagination from "./components/Pagination/index.vue";
import {Button, MessageBox,Message} from "element-ui"
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

Vue.config.productionTip = false;
// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store/index';
// 引入MockServer.js  ----mock数据
import '@/mock/mockServe';
// 引入swiper样式
import "swiper/css/swiper.css";
// 引入API
import * as API from '@/api'
// 引入懒加载
import VueLazyload from 'vue-lazyload'
import Mitao from '@/assets/17.gif'
Vue.use(VueLazyload,{
  // 懒加载默认图片
  // loading:'@/assets/17.gif' 在main.js中无法识别assets中的文件，因为webpack编译过程中会使assets的地址改变
  loading:Mitao
})
// 引入表单验证
import '@/plugins/validate'
// 引入自定义插件
import myPlugins from './plugins/myPlugins';
Vue.use(myPlugins,{
  name:'upper'
})

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由
  router,
  // 注册仓库
  store,
}).$mount('#app');
