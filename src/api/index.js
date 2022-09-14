// 当前这个模块：API进行统一管理
import requests from './ajax';
import mockRequests from './mockAjax';
// 三级联动接口
// /api/product/getBaseCategoryList get  无参数
export const reqCategoryList = () => {
    // 发请求 : axios发请求返回的结果Promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' });
};

// 获取banner接口
export const reqGetBannerList = () => {
    // mockRequests.get('/banner');
    return mockRequests({ url: '/banner', method: 'get' });
};

// 获取floor组件数据
export const reqFloorList = () => {
    return mockRequests({ url: '/floor', method: 'get' });
};

// 获取搜索模块数据 地址：/api/list  请求方式post
export const reqGetSearchList = (params) => {
    return requests({ url: '/list', method: 'post', data: params });
};


// 获取产品详情信息的接口
export const reqGoodInfo = (skuId) =>{
    return requests({url:`/item/${skuId}`,method:'get',})
}

// 将产品添加到购物车中(获取更新某一个产品的个数)   
export const reqAddOrUpdateShopCart = (skuID,skuNum) =>{
    return requests({url:`/cart/addToCart/${ skuID }/${ skuNum }`,method: 'post'})
}

// 获取购物车列表数据接口 
export const reqCartList = ()=>{
    return requests({url:'/cart/cartList',method:"get"})
}

// 删除购物产品的接口
export const reqDeleteCartById = (skuId)=>{
    return requests({url:`/cart/deleteCart/${skuId}`,method:"delete"})
}

// 修改商品选中的状态
export const reqUpdateCartCheckedByid = (skuId,isChecked)=>{
    return requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:"get"})
}

// 获取验证码
export const reqPhoneCode = (phone)=>{
    return requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
}


// 注册 phone,password,code
export const reqRegister=(data)=>{
    return requests({url:'/user/passport/register',data,method:'post'})  
}

// 登录 phone,password
export const reqUserLogin = (data)=>{
    return requests({url:'/user/passport/login',data,method:'post'}) 
}

// token获取用户信息
export const reqUserInfo = ()=>{
    return requests({url:'/user/passport/auth/getUserInfo',method:'get'})
}

// 退出登录
export const reqQuitLogin = ()=>{
    return requests({url:'/user/passport/logout',method:'get'})
}

// 获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = ()=>{
    return requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
}

// 获取商品清单
export const reqOrderInfo = ()=>{
    return requests({url:'/order/auth/trade',method:'get'})
}

// 提交订单
export const reqSubmitOrder = (tradeNo,data)=>{
    return requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
}

// 获取支付信息
export const reqPayInfo = (orderId)=>{
    return requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
}

// 查询订单支付状态
export const reqPayStatus = (orderId)=>{
    return requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
}

// 获取个人中心的数据 
export const reqMyOrderList = (page,limit)=>{
    return requests({url:`/order/auth/${page}/${limit}`,method:'get'})
}