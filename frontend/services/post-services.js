import axios from "axios";

const token = localStorage.getItem("userToken");

const commonConfig = {
  baseURL: "http://localhost:3000/api/",
};

const PostService = axios.create({ ...commonConfig });

// PostService.interceptors.request.use(function(config) {
//   // Interceptors axios pour introduire le header d'authentification
//   config.headers = { Authorization: `Bearer ${token}` };
//   return config;
// });

export default {
  createPost(postData) {
    return PostService.post("/posts", postData, {
      headers: { "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`},
    });
  },
  getOnePost(id) {
    return PostService.get("/posts/" + id);
  },
  getAllPosts() {
    return PostService.get("/posts", {
      headers: { "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`}
    })
  },

  deletePost(id) {
    return PostService.delete("/posts/" + id);
  },
};
