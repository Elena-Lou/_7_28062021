import axios from "axios";
import Store from "../src/store/index"; //use of store to get token

//variable to reuse for every axios call
const commonConfig = {
  baseURL: "http://localhost:3000/api/",
};

const CommentService = axios.create({ ...commonConfig });

export default {
  createComment(postId, commentData) {
    const token = Store.getters.token;
    return CommentService.post("/posts/" + postId, commentData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getAllComments(postId) {
    const token = Store.getters.token;
    return CommentService.get("/posts/" + postId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  modifyComment(id, commentData) {
    const token = Store.getters.token;
    return CommentService.get("/comments/" + id, commentData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  deleteComment(id) {
    const token = Store.getters.token;
    return CommentService.delete("/comments/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
