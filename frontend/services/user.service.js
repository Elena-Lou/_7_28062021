import axios from "axios";
// import authHeader from "./auth-headers";

const API_URL = "http://localhost:3000/api/posts/";

class UserService {
  getAllPosts() {
    return axios.get(API_URL);
  }

  // getOnePost() {
  //   return axios.get(API_URL + post.id, { headers: authHeader() });
  // }
}

export default new UserService();
