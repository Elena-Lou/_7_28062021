<template>
  <div class="home">
    <h1>Groupomania</h1>

    <LoginForm/>

    <h2>Vous n'avez pas encore de compte ? Inscrivez-vous </h2>

    <Posts/>
    <NewPost/>

  </div>
</template>

<script>
// @ is an alias to /src
import Posts from "../components/Posts.vue";
import NewPost from "../components/NewPost.vue";
import LoginForm from "../components/LoginForm.vue";
import UserService from "/services/user.service";

export default {
  name: "Home",
  components: {
    Posts,
    NewPost,
    LoginForm,
  },

  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getAllPosts().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
}
</script>
