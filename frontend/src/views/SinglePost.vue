<template>
    <div class="post__header">
       <h2 class="post__title">{{ post.title }}</h2>
            <span class="post__date"> {{dateFormat(post.date)}}</span>

            <div class="post__content">
                <p class="post__text">{{ post.text }}</p>
            </div>
            <div class="post__actions">

                <button v-if="sessionUserId === id || isAdmin" @click.prevent="deletePost">Supprimer</button>
            </div>
    </div>

</template>

<script>
import PostService from "/services/post-services";
import { mapState } from "vuex";

export default {
  name: 'SinglePost',

  data() {
    return{
      id: null,
      post: [],
      isAdmin: true,
    };
  },
  
  mounted() {                                    
    this.getOnePost();
  },
  computed: mapState({
    sessionUserId : (state) => state.sessionUserId,
    isAdmin : (state) => state.isAdmin
  }),
  
  methods: {
    getOnePost(){
        const postId = this.$route.params.id;
        PostService.getOnePost(postId)
        .then(res => {
          this.post = res.data[0];
          this.id = res.data[0].userId;
        })

        .catch(error => {
          console.log( error )
        })
    },
    deletePost(){
      let postId = this.$route.params.id;

      PostService.deletePost(postId)
      .then((res) => {
        this.post = res.data[0];
        this.$router.push({ path: '/posts'});
      })
      .catch(error => {
          console.log( error )
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