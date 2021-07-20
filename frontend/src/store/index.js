import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sessionUserId: null,
    isAdmin: false,
  },
  mutations: {
    SET_USER_ID(state, user) {
      state.sessionUserId = user;
    },
    SET_ADMIN(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
  },
  actions: {
    setAuthUser({ commit }, sessionUserId) {
      commit("SET_USER_ID", sessionUserId);
    },
    setAdmin({ commit }, isAdmin) {
      commit("SET_ADMIN", isAdmin);
    },
  },
  modules: {},
});
