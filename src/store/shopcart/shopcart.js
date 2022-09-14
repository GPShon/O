import { reqCartList, reqDeleteCartById, reqUpdateCartCheckedByid } from "@/api"
const state = {
  cartList: []
}

const mutations = {
  REQCARTLIST(state, cartList)
  {
    state.cartList = cartList
  }
}

const actions = {
  // 获取购物车列表数据
  async getCartList({ commit })
  {
    let result = await reqCartList();
    if (result.code === 200)
    {
      commit('REQCARTLIST', result.data)
    }
  },
  // 删除购物车某一个商品
  async DeleteCartListBySkuId({ commit }, skuId)
  {
    let result = await reqDeleteCartById(skuId)
    if (result.code == 200)
    {
      return 'ok'
    }
    else
    {
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除全部勾选的产品
  deleteAllCheckedCart({ getters, dispatch })
  {
    let PromiseAll = [];
    getters.cartList.cartInfoList.filter(item => item.isChecked == 1).forEach(item =>
    {
      let Promise = dispatch('DeleteCartListBySkuId', item.skuId)
      PromiseAll.push(Promise)
    })
    return Promise.all(PromiseAll)
  },

  // 修改购物车某一个产品选中状态
  async updateCheckedById({ commit }, { skuId, isChecked })
  {
    let result = await reqUpdateCartCheckedByid(skuId, isChecked)
    if (result.code == 200)
    {
      return 'ok'
    }
    else
    {
      return Promise.reject(new Error('faile'))
    }
  },

  // 全选操作
  checkAllCart({ commit, getters, dispatch }, isChecked)
  {
    let PromiseAll =[]
    getters.cartList.cartInfoList.forEach(item =>
    {
      let Promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
      PromiseAll.push(Promise)
    })
    return Promise.all(PromiseAll)
  }

}

const getters = {
  cartList(state)
  {
    return state.cartList[0] || []
  },

}

export default
{
  mutations,
  actions,
  state,
  getters
}