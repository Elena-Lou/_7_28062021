import axios from "axios";

const token = localStorage.getItem("userToken");

const commonConfig = {
  baseURL: "http://localhost:3000/api/",
};

const PostService = axios.create({ ...commonConfig });

PostService.interceptors.request.use(function(config) {
  // Interceptors axios pour introduire le header d'authentification
  config.headers = { Authorization: `Bearer ${token}` };
  return config;
});

export default {
  createPost(postData) {
    return PostService.post("/post", postData, {
      headers: { "Content-Type": "application/json" },
    });
  },
  getOnePost(id) {
    return PostService.get("/post/" + id);
  },
  getAllPosts() {
    return PostService.get("/post");
  },
  deletePost(id) {
    return PostService.delete("/post/" + id);
  },
};
