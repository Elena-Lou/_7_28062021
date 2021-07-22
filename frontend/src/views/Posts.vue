<template>
<div class="container">

  <div class="posts"  v-if="posts.length > 0">
    <article class="post" v-for="post in posts" :key="post.id">

        <div class="post__header">
          <router-link :to="`/posts/${post.id}`">
            <h2 class="post__title">{{ post.title }}</h2></router-link>

          <div class="post__info">
            <span class="post__info__date">{{dateFormat(post.date)}}</span><br>
            <span class="post__info__author">{{ post.name }}</span>
          </div>
        </div>

        <div class="post__content">
          <p class="post__text">{{ post.text }}</p>
        </div>
      </article>

  </div>

  <div v-if="posts.length === 0" class="posts__empty">
    <p>Le fil de publication est vide...</p>
    <router-link to="/post"> Créez une publication</router-link>
  </div>

</div>

  
</template>

<script>
import PostService from "/services/post-services";

export default {
    name: "Posts",

    data(){
        return {
          posts : []   //all the posts are into an array, each post accessed with "for in"                   
        }
    },
    
    beforeMount() { 
        this.getAllPosts();
    },
    methods: {
        getAllPosts(){ 
            PostService.getAllPosts()
              .then(res => {
                this.posts = res.data;
            })
            .catch((e) => {
                if (e.response.status === 400) {
                  console.log("Il n'y a pas de publications");
                }
            })
        },

      dateFormat(date){
      const event = new Date(date);
      const data = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return event.toLocaleDateString('fr-FR', data);
    }
    }
}
</script>

<style lang="scss" scoped>
  .posts {
        margin: 0 auto;
        padding: 20px;
        max-width: 800px;
    }

    .post {
        padding: 20px;
        margin-bottom: 30px;
        border: 3px solid #9b4747;
        text-align: left;

        &__header {
          display: flex;
          justify-content: space-between;
          color: rgb(0, 0, 0);
          font-size: .8rem;
        }

        &__title {
          color: #9b4747
        }
    }

</style>

