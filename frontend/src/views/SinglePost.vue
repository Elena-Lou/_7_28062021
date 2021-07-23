<template>
  <div class="container">
    <div class="post">

      <div class="post__header">
        <h2 class="post__title">{{ post.title }}</h2>
            <span class="post__date"> {{dateFormat(post.date)}}</span>
      </div>

      <div class="post__content">
        <p class="post__text">{{ post.text }}</p>
      </div>

      <div class="post__btn">
        <!-- <button class="post__btn__modify" v-if="user.id === post.userId" @click.prevent="modifyPost">Modifier</button> -->
        <button class="post__btn__delete" v-if="user.id === post.userId || user.admin" @click.prevent="deletePost">Supprimer</button>    
      </div>

    </div>

      <Comments/> 

  </div>

</template>

<script>
import PostService from "/services/post-services";
import { mapState } from "vuex";
import Comments from '../components/Comments.vue';

export default {
  components: { 
    Comments 
  },

  name: 'SinglePost',

  data() {
    return{
      post: [],
    };
  },
  
  mounted() {                                    
    this.getOnePost();
  },
  computed: mapState({ //accesses user's id and admin role through {user} stored
    user : (state) => state.user,
    }),
  
  methods: {

    getOnePost() {
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

    deletePost() {
      let postId = this.$route.params.id;

      PostService.deletePost(postId)
        .then((res) => {
            this.post = res.data[0];
            this.$router.push({ path: "/posts"});
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

<style lang="scss" scoped>

    .post {
        margin: 50px auto;
        padding: 30px;
        width: 80%;
        text-align: left;
        border-bottom: solid #9b4747 3px;

        &__title {
          margin: 20px 0;
          color: #9b4747;
          font-size: 2rem;
        }

        &__content {
          margin-top: 20px;
        }
        
        &__btn {
          width: 100%;
          display: flex;
          justify-content: space-between;  

          &__modify {
            min-width: 65px;
            margin: 20px auto;
            padding: 8px;
            font-size: 0.9em;
            background-color: rgb(51, 48, 48) ;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;

          }

          &__delete {
            min-width: 65px;
            background-color: #9b4747;
            margin: 20px auto;
            padding: 8px;
            font-size: 0.9em;
            color: white;          
            border: none;
            border-radius: 10px;
            cursor: pointer;

          }

        }
    }
   
</style>