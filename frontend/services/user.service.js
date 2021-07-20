import axios from "axios";
import authHeaders from "./auth-headers";

const API_URL = "http://localhost:3000/api/";

class UserService {
  getAllPosts(vm) {
    console.log("Appel posts");
    console.log(this);
    return axios.get(API_URL + "posts", { headers: authHeaders(vm) });
  }

  getOnePost(vm, post_id) {
    return axios.get(API_URL + "posts/" + post_id, { headers: authHeaders(vm) });
  }

  createPost(data) {
    return axios.post(API_URL + "posts", data, { headers: authHeaders() });
  }

  modifyPost(post_id, data) {
    return axios.put(API_URL + "posts/" + post_id, data, {
      headers: authHeaders(),
    });
  }

  deletePost(post_id) {
    return axios.delete(API_URL + "posts/" + post_id, {
      headers: authHeaders(),
    });
  }

  createComment(post_id, data) {
    return axios.post(API_URL + "comments/" + post_id, data, {
      headers: authHeaders(),
    });
  }

  deleteComment(comment_id) {
    return axios.delete(API_URL + "comments/" + comment_id, {
      headers: authHeaders(),
    });
  }
}

export default new UserService();
