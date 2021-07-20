<template>
  <div class="posts">
    <article class="post" v-for="post in posts" :key="post.id">
      <router-link :to="'/posts/' + post.id">
        <div class="post__header">
          <h2 class="post__title">{{ post.title }}</h2>
          <div class="post__info">
            <span class="post__info__date">{{ post.date }}</span>
            <span class="post__info__author">{{ post.user.name }}</span>
          </div>
        </div>

        <div class="post__content">
          <p class="post__text">{{ post.text }}</p>
        </div>
      </router-link>
    </article>
  </div>
</template>

<script>
import UserService from "/services/user.service";

export default {
  name: "Posts",

  props: {
    post: {
      type: Object,
    },
  },

  methods: {
    getAllPosts() {
      console.log(this.$store);
      const vm = this;
      UserService.getAllPosts(vm)
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getOnePost(post_id) {
      this.$router.push(`/posts/${post_id}`);
    },
  },
  beforeMount() {
    this.getAllPosts();
  },
};
</script>

<style lang="scss" scoped></style>
