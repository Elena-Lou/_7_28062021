import { createRouter, createWebHistory } from "vue-router";

import Posts from "../views/Posts.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import SinglePost from "../views/SinglePost.vue";
import NewPost from "../views/NewPost.vue";
import Profile from "../views/Profile.vue";



const routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
    },

    {
      path: "/posts",
      name: "Posts",
      component: Posts,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("userToken");
        if (!token) {
          next("/login");
        }
        next();
      },
    },

    {
      path: "/login",
      name: "Login",
      component: Login,
    },

    {
      path: "/signup",
      name: "Signup",
      component: Signup,
    },

    {
      path: "/posts/:id",
      name: "SinglePost",
      component: SinglePost,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("userToken");
        if (!token) {
          next("/login");
        }
        next();
      },
    },

    {
      path: "/post",
      name: "NewPost",
      component: NewPost,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("userToken");
        if (!token) {
          next("/login");
        }
        next();
      },
    },
    
    {
      path: "/user/:id",
      name: "Profile",
      component: Profile,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("userToken");
        if (!token) {
          next("/login");
        }
        next();
      },
    },
  ];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


export default router;
