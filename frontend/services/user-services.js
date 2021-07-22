import axios from "axios";

const token = localStorage.getItem("userToken");

const commonConfig = {
  baseURL: "http://localhost:3000/api/auth",
};

const authUser = axios.create({ ...commonConfig });

export default {
  authUser,
  signup(data) {
    return authUser.post("/signup", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  login(data) {
    return authUser.post("/login", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getProfile(id) {
    return authUser.get("/user/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }, 

  deleteProfile(id) {
    return authUser.delete("/user/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
