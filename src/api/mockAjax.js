// 对axios进行二次封装
import axios from 'axios';
// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css';
// start:进度条开始 done：进度条结束


// 1.利用axios对象的方法create，创建一个axios实例
// 2.request就是axios，只不过稍微配置一下
const mockRequests = axios.create({
    // 基础路径 
    baseURL: '/mock',
    // 请求超时的时间5s
    timeout: 5000,
});
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出前完成一些事情
mockRequests.interceptors.request.use((config) => {
    // config:配置对象，对象里面有一个属性很重要，header请求头
    // 进度条开始
    nprogress.start();
    return config;
});
// 响应拦截器
mockRequests.interceptors.response.use((res) => {
    //成功的回调函数，服务器响应的数据回来后，响应拦截器可以检测并完成一些事情
    // 进度条结束
    nprogress.done();
    return res.data;
}, (error) => {
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'));
});

export default mockRequests;