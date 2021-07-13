<template>
  <div class="home">
    <h1>Groupomania</h1>

    <Posts/>

  </div>
</template>

<script>
// @ is an alias to /src
import Posts from "@/components/Posts.vue";




export default {
  name: "Home",
  components: {
    Posts,
    NewPost,
  }
}
</script>
