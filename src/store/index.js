import Vue from 'vue'
import Vuex from 'vuex'
import { login, userInfo } from "../api/user"
import { setToken, getToken, setUserInfo, getUserInfo } from "../utils/auth"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken() || "",
    userInfo: getUserInfo() || ""
  },
  getters: {
    token(state) {
      return state.token
    },
    userInfo(state) {
      return state.userInfo
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
      setUserInfo(userInfo)
    }
  },
  actions: {
    async login({ commit }, loginForm) {
      try {
        const response = await login(loginForm)
        commit("SET_TOKEN", response.token)
        return response.token
      } catch (e) {
        console.log(e.message)
      }
    },
    async handleUserInfo({ commit }) {
      try {
        const userinfo = await userInfo()
        commit("SET_USER_INFO", userinfo)
        return userinfo
      } catch (e) {
        console.log(e.message)
      }
    }
  },
  modules: {
  }
})
// 页面调用方法

async handleLogin(){
  const token = await this.$store.dispatch("login",this.loginForm)
  if(!token) return
  const userInfo = await this.$store.dispatch("handleUserInfo")
  if(!userInfo) return
  this.$message.success("登录成功")
  this.$router.push("/")
}