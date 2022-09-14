// 引入mock模块
import Mock from 'mockjs';
// 把JSON数据格式引入
// JSON 默认对外暴露
import banner from './banner';
import floor from './floor';
// mock 数据:第一个参数请求地址 第二个参数请求数据
Mock.mock("/mock/banner", { code: 200, data: banner }); //模拟首页大轮播图的数据
Mock.mock("/mock/floor", { code: 200, data: floor });//模拟首页floor的数据