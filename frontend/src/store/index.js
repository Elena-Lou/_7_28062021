// import Vue from "vue";
import Vuex from "vuex";

// Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: null,
      name: null,
      email: null,
      admin: null
    },
    token: null
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user))
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", JSON.stringify(token));
    },
    INITIALIZE_STORE(state) {
      if(localStorage.getItem("token")) {
        state.token = JSON.parse(localStorage.getItem("token"));
      } 
      if(localStorage.getItem("user")) {
        state.user = JSON.parse(localStorage.getItem("user"))
      }
    }
  },

  actions: {
    setAuthUser({ commit }, user) {
      commit("SET_USER", user);
    },

    setToken({ commit }, token) {
      commit("SET_TOKEN", token);
    },
  },
  modules: {},

  getters: {
    token(state) {
      return state.token
    },

    user(state) {
      return state.user
    }
  }
});
