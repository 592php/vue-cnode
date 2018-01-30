import * as types from './types'
import server from '../../api'

const state = {
  // 用户登录状态
  loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
  // 用户登录信息
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
  // 用户数据信息
  userData: [],
  accesstoken: JSON.parse(localStorage.getItem('accesstoken')) || {},
  loading: false,
  showToast: false,
  leftNavStatus: false,
  showSuccess: true,
  showFail: false,
  toastMsg: '操作成功',
  showTimePicker: false,
  alertMsg: '退出登录',
  showAlert: false
}
const actions = {
  // 用户登录
  async login ({
    commit
  }, data) {
    const res = await server.login(data)
      .then(res => {
        localStorage.setItem('userInfo', JSON.stringify(res))
        localStorage.setItem('loginStatus', true)
        commit(types.SET_USER_INFO, res)
        commit(types.SET_LOGIN_STATUS, true)
        return res
      }).catch(err => {
        return err.response.data
      })

    return res
  },
  // 获取消息信息
  async getMessage ({
    commit
  }) {
    let data = {
      'accesstoken': state.accesstoken,
      'time': new Date().getTime()
    }
    const res = await server.getMessages(data)
      .then(res => {
        return res
      }).catch(err => {
        return err.response.data
      })

    return res
  },
  // 获取用户信息
  async getUser ({
    commit
  }) {
    const res = await server.getUser(state.userInfo.loginname)
      .then(res => {
        return res
      }).catch(err => {
        return err.response.data
      })

    return res
  },
    // 主题列表
  async getList ({
    commit
  }, data) {
    const res = await server.getList(data)
      .then(res => {
        return res
      }).catch(err => {
        return err.response.data
      })

    return res
  },
  // 添加主题
  async postArticle ({
    commit
  }, data) {
    const res = await server.postArticle(data)
      .then(res => {
        return res
      }).catch(err => {
        return err.response.data
      })

    return res
  },
  // 我的收藏
  async userCollect ({
    commit
  }) {
    const res = await server.userCollect(state.userInfo.loginname)
      .then(res => {
        return res
      }).catch(err => {
        return err.response.data
      })

    return res
  },
  // 主题详情
  async detailes ({
    commit
  }, data) {
    const res = await server.detailes(data)
      .then(res => {
        return res
      }).catch(err => {
        return err.response.data
      })

    return res
  },
  // 退出登录
  loginOut ({
    commit
  }) {
    localStorage.removeItem('loginStatus')
    localStorage.removeItem('userInfo')
    commit(types.SET_LOGIN_STATUS, false)
    commit(types.SET_USER_INFO, {})
  },
  showToast ({
    commit
  }, status) {
    commit(types.COM_SHOW_TOAST, status)
  },

  toastMsg ({
    commit
  }, str) {
    commit(types.COM_TOAST_MSG, str)
  },
  showAlert ({
    commit
  }, status) {
    commit(types.COM_SHOW_ALERT, status)
  },
  alertMsg ({
    commit
  }, str) {
    commit(types.COM_ALERT_MSG, str)
  }

}

const getters = {
  getUserData: state => state.userData,
  loginStatus: state => state.loginStatus,
  userInfo: state => state.userInfo,
  token: state => state.accesstoken,
  loading: state => state.loading,
  showToast: state => state.showToast,
  showAlert: state => state.showAlert
}

const mutations = {
  [types.SET_USER_INFO] (state, res) {
    state.userInfo = res
    state.userInfo = res
  },

  [types.SET_LOGIN_STATUS] (state, status) {
    state.loginStatus = status
  },

  [types.GET_USER_DATA] (state, res) {
    state.userData = res
  },
  [types.COM_LOADING_STATUS] (state, status) {
    state.loading = status
  },

  [types.COM_SHOW_TOAST] (state, status) {
    state.showToast = status
  },

  [types.COM_SHOW_SUCCESS] (state, status) {
    state.showSuccess = status
  },

  [types.COM_SHOW_FAIL] (state, status) {
    state.showFail = status
  },

  [types.COM_TOAST_MSG] (state, str) {
    state.toastMsg = str
  },

  [types.COM_NAV_STATUS] (state, status) {
    state.leftNavStatus = status
  },

  [types.COM_SHOW_TIME_PICKER] (state, status) {
    state.showTimePicker = status
  },

  [types.COM_SHOW_ALERT] (state, status) {
    state.showAlert = status
  },
  [types.COM_ALERT_MSG] (state, str) {
    state.alertMsg = str
  }

}

export default {
  state,
  actions,
  getters,
  mutations
}
