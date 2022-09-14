import { reqPhoneCode, reqRegister, reqUserLogin, reqUserInfo, reqQuitLogin } from '@/api'
const state = {
  PhoneCode: '',
  token: '',
  userInfo: {}
};

const mutations = {
  GETPHONECODE(state, data)
  {
    state.PhoneCode = data
  },
  USERLOGIN(state, token)
  {
    state.token = token;
    localStorage.setItem('token', token)
    
  },
  GETUSERINFO(state, userInfo)
  {
    state.userInfo = userInfo
  },
  CLEAR(state)
  {
    state.token = ''
    state.userInfo = {}
    localStorage.removeItem('token')

  }
};

const actions = {
  // 获取验证码
  async getPhoneCode({ commit }, phone)
  {
    let result = await reqPhoneCode(phone);
    if (result.code === 200)
    {
      commit('GETPHONECODE', result.data)
      return 'ok'
    }
    else
    {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户注册
  async userRegister({ commit }, user)
  {
    let result = await reqRegister(user)
    if (result.code === 200)
    {
      return 'ok'
    }
    else
    {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户登录[token ]
  async userLogin({ commit }, data)
  {
    let result = await reqUserLogin(data)
    // 服务器下发 token，用户唯一标识符uuid
    // 将来通过带token找服务器向用户展示信息
    if (result.code === 200)
    {
      commit("USERLOGIN", result.data.token)
      console.log('登陆成功');
      return 'ok'
    }
    else
    {
      return Promise.reject(new Error('登录失败，请输入正确的账号密码'))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit })
  {
    if (localStorage.getItem('token'))
    {
      state.token = localStorage.getItem('token');
    }
    let result = await reqUserInfo();
    if (result.code === 200)
    {
      commit('GETUSERINFO', result.data)
      return 'ok'
    }
    else
    {
      return Promise.reject(new Error('请登录以获取最新信息'))
    }
    // }
  },
  // 退出登录
  async QuitLogin({ commit })
  {
    let result = await reqQuitLogin();
    if(result.code === 200){
      commit('CLEAR')
      return 'ok'
    }else{
      Promise.reject(new Error('faile'))
    }    
  }

};

const getters = {};
export default
{
  state,
  mutations,
  actions,
  getters
}