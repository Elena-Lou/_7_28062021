<template>
<div class="container">

  <div class="posts"  v-if="posts.length > 0">
    <article class="post" v-for="post in posts" :key="post.id">

        <div class="post__header">
          <router-link :to="`/posts/${post.id}`">
            <h2 class="post__title">{{ post.title }}</h2></router-link>

          <div class="post__info">
            <span class="post__info__date">{{dateFormat(post.date)}}</span>
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
            posts : []                     
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
                console.log(res.data);
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

