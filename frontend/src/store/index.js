
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import AuthService from "/services/auth.service";
import UserService from "/services/user.service";
import jwt from "vue-jwt-decode";

export default Vuex.createStore({
  strict: true,
  state: {
    token: null,
    user: {
      id: null,
      name: null,
      email: null,
      password: null
    },
    users: [],
    isLoggedIn: false,
    isAdmin: false,
    posts: [],
    post: {
      id: null,
      title: null,
      content: null,
      user: {
        name:"",
        id: ""
      },
    },
    comments: [],
    comment: {
      id: null,
      content: null,
      user: null,
    },
  },

  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],

  getters: {
    token(state) {
      return state.token;
    },

    posts(state) {
      return state.posts;
    },

    post(state) {
      return state.post;
    },

    post_id(state) {
      return state.post.id;
    },

    user(state) {
      return state.user;
    },

    user_id(state) {
      return state.user.id;
    },

    user_name(state) {
      return state.user.name;
    },

    users(state) {
      return state.users;
    },

    isLoggedIn(state) {
      return state.isLoggedIn;
    },

    comments(state) {
      return state.comments;
    },

    comment(state) {
      return state.comment;
    },

    comment_id(state) {
      return state.comment.id;
    },

    isAdmin(state) {
      return state.isAdmin;
    }
  },

  mutations: {
    LOGIN_SUCCESS(state, token) {
      state.token = token;
      if (token) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },

    SET_ADMIN(state) {
    const token = state.token
    const decodedToken = jwt.decode(token);
    const admin = decodedToken.admin;

      if (admin == 1) {
        state.isAdmin = true;
      } else {
        state.isAdmin = false;
      }
    },

    SET_USER(state, user) {
      state.user = user;
    },

    DELETE_TOKEN(state) {
      state.token = null;
      state.user = "";
      state.isLoggedIn = false;
    },

    GET_PROFILE(state, user) {
      state.user = user;
    },

    DELETE_PROFILE(state, id) {
      state.users = [...state.users.filter(() => state.user.id !== id)];
    },

    LOG_OUT(state) {
      sessionStorage.clear();
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
    },

    GET_ALL_POSTS(state, posts) {
      (state.posts = posts)
    },

    GET_ONE_POST(state, post) {
      state.post = post;
    },

    CREATE_POST(state, post) {
      state.posts = [post, ...state.posts];
    },

    MODIFY_POST(state, id, post) {
      state.posts.find((post) => post.id === id), post;
    },

    DELETE_POST(state, id) {
      state.posts = [...state.posts.filter((post) => post.id !== id)];
    },

    CREATE_COMMENT(state, comment) {
      state.post = [comment, ...state.post];
    },

    DELETE_COMMENT(state, id) {
      state.post = [...state.post.filter((comment) => comment.id !== id)];
    },
  },

  actions: {
    LoginSuccess({ commit }, token) {
      commit("LOGIN_SUCCESS", token);
    },

    deleteToken({ commit }, token) {
      commit("DELETE_TOKEN", token);
    },

    logOut({ commit }) {
      commit("LOG_OUT");
    },

    setUser({ commit }, user) {
      commit("SET_USER", user);
    },

    getProfile({ commit }, user_id) {
      AuthService.getProfile(user_id)
      .then((response) => {
        const user = response.data;
        commit("GET_PROFILE", user);
      });
    },

    deleteProfile({ commit }, user_id) {
      AuthService.deleteProfile(user_id)
      .then((user) => {
        commit("DELETE_PROFILE", user.id);
      });
    },

    getAllPosts({ commit }) {
      UserService.getAllPosts().then((response) => {
        const posts = response.data;
        commit("GET_ALL_POSTS", posts);
      });
    },

    getOnePost({ commit }, post_id) {
      UserService.getOnePost(post_id).then((response) => {
        const post = response.data;
        commit("GET_ONE_POST", post);
      });
    },

    createPost({ commit }, data) {
      UserService.createPost(data)
        .then((response) => {
          const post = response.data;
          commit("CREATE_POST", post);
        })
    },

    modifyPost({ commit }, post_id, data) {
      UserService.modifyPost(post_id, data)
      .then((response) => {
        const post = response.data;
        commit("MODIFY_POST", post_id, post);
      });
    },

    deletePost({ commit }, post_id) {
      UserService.deletePost(post_id)
        .then(() => {
          commit("DELETE_POST", post_id);
        })
    },

    createComment({ commit }, post_id) {
      UserService.createComment(post_id)
        .then((response) => {
          const comment = response.data;
          commit("CREATE_COMMENT", comment);
        })
    },

    deleteComment({ commit }, comment_id) {
      UserService.deleteComment(comment_id)
        .then(() => {
          commit("DELETE_COMMENT", comment_id);
        })
    },
  },
});