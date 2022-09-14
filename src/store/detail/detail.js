import { reqGoodInfo, reqAddOrUpdateShopCart } from '@/api'
// 封装游客身份模块uuid ---> 生成一次随机字符串
import {getUUID} from '@/utils/uuid_token'
const state = {
  goodInfo: {},
  // 游客临时身份
  uuid_token:getUUID(),
}
const mutations = {
  GETGOODINFO(state, goodInfo)
  {
    state.goodInfo = goodInfo
  },

}
const actions = {
  async getGoodInfo({ commit }, skuId)
  {
    let result = await reqGoodInfo(skuId)
    if (result.code === 200)
    {
      commit('GETGOODINFO', result.data)
    }
  },

  async addOrUpdateShopCart({ commit }, { skuId, skuNum })
  {
    // 加入购物车返回的解构
    //加入购物车以后（发请求），前台将参数带给服务器
    //服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次操作成功
    //因为服务器没有返回其余数据，因此咱们不需要三连环存储数据

    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    if(result.code === 200) {
      return "ok"
    }else{
      return Promise.reject(new Error('faile'))
    }    
  }

}
const getters = {
  // 路径导航简化
  categoryView(state)
  {
    return state.goodInfo.categoryView || {}
  },
  // 产品信息简化
  skuInfo(state)
  {
    return state.goodInfo.skuInfo || {}
  },
  // 产品售卖属性简化
  spuSaleAttrList(state)
  {
    return state.goodInfo.spuSaleAttrList || []
  }

}
export default
{
  state,
  mutations,
  actions,
  getters,
};