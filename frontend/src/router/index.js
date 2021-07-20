import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Signup from "../views/Signup.vue";
import Post from "../views/SinglePost.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/login",
    name: "login",
    component: Login,
  },

  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },

  {
    path: "/posts/:id",
    name: "Post",
    component: Post,
  },

  {
    path: "/user/:id",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ["/login", "/signup"];
//   const authRequired = !publicPages.includes(to.path);
//   const isLoggedIn = this.$store.getters.isLoggedIn


//   if (authRequired && !isLoggedIn) {
//     next("/login");
//   } else {
//     next();
//   }
// });

export default router;