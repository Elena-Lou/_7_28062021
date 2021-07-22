import Vuex from "vuex";

export default new Vuex.Store({
  //user data needed throughout website and token
  state: {
    user: {
      id: null,
      name: null,
      email: null,
      admin: null,
    },
    token: null,
  },

  mutations: {
    //sets {user} into localstorage as a string
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    //sets {user} into localstorage as a string
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", JSON.stringify(token));
    },
    //parses token and user data and stores them
    INITIALIZE_STORE(state) {
      if (localStorage.getItem("token")) {
        state.token = JSON.parse(localStorage.getItem("token"));
      }
      if (localStorage.getItem("user")) {
        state.user = JSON.parse(localStorage.getItem("user"));
      }
    },
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
//getters to be called and accessed throughout Vue
  getters: {
    token(state) {
      return state.token;
    },

    user(state) {
      return state.user;
    },
  },
});
