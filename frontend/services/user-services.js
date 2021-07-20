import axios from "axios";

const token = localStorage.getItem("userToken");

const commonConfig = {
  baseURL: "http://localhost:3000/api/",
};

const authUser = axios.create({ ...commonConfig });

authUser.interceptors.request.use(function(config) {
  // Interceptors axios pour introduire le header d'authentification
  config.headers = { Authorization: `Bearer ${token}` };
  return config;
});

export default {
  authUser,
  signup(data) {
    return authUser.post("auth/signup", data);
  },

  login(data) {
    return authUser.post("auth/login", data);
  },

  getProfile(id) {
    return authUser.get("/user/" + id);
  },

  deleteProfile(id) {
    return authUser.delete("/user/" + id);
  },
};
