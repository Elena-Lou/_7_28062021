import axios from "axios";
import Store from "../src/store/index";

const commonConfig = {
  baseURL: "http://localhost:3000/api/auth",
};

const authUser = axios.create({ ...commonConfig });

export default {
  authUser,
  signup(data) {
    return authUser.post("/signup", data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  },

  login(data) {
    return authUser.post("/login", data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  },

  getProfile(id) {
    const token = Store.getters.token;
    return authUser.get("/user/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }, 

  deleteProfile(id) {
    const token = Store.getters.token;
    return authUser.delete("/user/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
