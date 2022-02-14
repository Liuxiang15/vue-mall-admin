import Vue from 'vue';
import Vuex from 'vuex';
import { getUserCookie, setCookie, removeUserCookie } from '../utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用于切换菜单的闭合状态  false 代表不闭合  true代表闭合
    collapsed: false,
    // user: {
    //   username: "",
    //   appkey: "",
    //   role: "",
    //   email: ""
    // }
    user: getUserCookie(),
    // 初始化的时候需要获取用户cookie，所以这里直接用方法
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    logOut(state) {
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      // 不直接修改state,也不直接通过mutation,通过action可通过插件查看数据变化流
      commit('setUserInfo', userInfo);
      // TODO: 还需要设置在cookie中
      setCookie(userInfo);
    },
    logOut({ commit }) {
      commit('logOut');
      removeUserCookie();
    },
  },
  modules: {},
});
