<template>
  <div class="home">
      <img src="../assets/icon.png" alt="logo Groupomania">
    <Posts/>
    
    <NewPost/>

  </div>
</template>

<script>

import Posts from "../components/Posts";
import NewPost from "../components/NewPost";

export default {
  name: "Home",
  components: {
    Posts,
    NewPost,
  },
  
}
</script>

<style lang="scss" scoped>
img {
  width: 30%;
  margin: auto;
  align-self: center;
}
</style>
