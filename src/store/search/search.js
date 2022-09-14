import { reqGetSearchList } from "@/api";
// search 模块小仓库
const state = {
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
const actions = {
    // 获取Search 模块数据
    async getSearchList({ commit }, params = {}) {
        // 调用reqGetSearchInfo函数获取服务器数据时，至少传递一个参数
        // params 形参，是当用户派发action 的时候，第二个参数u传递进来，至少是一个空对象 
        let result = await reqGetSearchList(params);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
};
const getters = {
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    attrsList(state) {
        return state.searchList.attrsList;
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
};