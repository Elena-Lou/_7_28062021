import axios from "axios";
import Store from "../src/store/index" //use of store to get token 

//variable to reuse for every axios call
const commonConfig = {
  baseURL: "http://localhost:3000/api/",
};

const PostService = axios.create({ ...commonConfig });

export default {
  createPost(postData) {
    const token = Store.getters.token;
    return PostService.post('/posts', postData, {
      headers: { "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`},
    });
  },

  getOnePost(id) {
    const token = Store.getters.token;
    return PostService.get('/posts/' + id, {
      headers: { "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`},
    });
  },

  getAllPosts() {
    const token = Store.getters.token;
    return PostService.get('/posts', {
      headers: { "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`}
    })
  },

  deletePost(id) {
    const token = Store.getters.token;
    return PostService.delete('/posts/' + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
