import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Signup from "../views/Signup.vue";
import Post from "../views/SinglePost.vue";
import Profile from "../views/Profile.vue";



export default router

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


const routes = [
    {
      path: "/posts/",
      name: "Home",
      component: Home,
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
      component: Profile
    },
];

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/home"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});