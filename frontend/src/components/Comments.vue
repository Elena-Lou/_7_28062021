<template>
  <div class="comment">
      
        <form class="comment__form">

            <label for="comment__form__label">Laisser un commentaire :</label>
            <textarea class="comment__form__text" name="comment__form__text" v-model="text" id="form__post__content" placeholder="Laissez un commentaire..." required></textarea>

            <button class="comment__form__btn" @click.prevent="createComment" type="submit" id="send-comment">Envoyer</button>
        
        </form>

        <h3 v-if="comments.length > 0">Commentaires :</h3>

            <div class="comments" v-for="comment in comments" :key="comment.id">

            <div class="comments__details">Par {{comment.name}} le {{dateFormat(comment.date)}} 
                <span @click="deleteComment(comment.id)" v-if="comment.userId == $user.userId || $user.admin == 1" :key="comment.id">Supprimer</span>
            </div>
            {{comment.content}}
            </div>
        </div>
        
</template>

<script>

import CommentService from "/services/comments-services";

import {mapState} from "vuex";


export default {
    names: 'Comments',

    data(){
        return{
            text: "",
            comments: []
        }
    },
     //gets user ID from the {user} stored
    computed: mapState({
        user: (state) => state.user.id, 
  }),

    beforeMount() { 
        this.getAllComments();
    },

    methods: {
        createComment(){
            let userId = this.user.id;
            let data = { 
            text: this.text
            };

            let postData = (userId, data);

            CommentService.createComment(postData)
                .then(res => {
                    if (res.status === 201) { 
                        setTimeout( () => this.getAllComments());
                    } else {
                        console.log("erreur d'envoi");
                    }
                })
                .catch(e => {
                    console.log(e);
                })

        },

        getAllComments(){
            const postId = this.$route.params.id;
            CommentService.getAllComments(postId)
              .then(res => {
                this.posts = res.data;
            })
            .catch((e) => {
                if (e.response.status === 400) {
                  console.log("Il n'y a pas de commentaires");
                }
            })
        },

        deleteComment(){
            let commentId = this.comment.id;
            console.log(commentId);
            let postId = this.$route.params.id
           CommentService.deleteComment(commentId)
                .then((res) => {
                    this.comment = res.data[0];
                    this.$router.push({ path: "/posts/"+ postId});
                })
                .catch(error => {
                    console.log( error )
                })
        },

        dateFormat(date){
            const event = new Date(date);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return event.toLocaleDateString('fr-FR', options);
        }
    }
}
</script>

<style lang="scss" scoped>

    .Comments{
        max-width: 800px;
        margin: 0 auto;
        padding: 30px;
    }
    label{
        text-align: left !important;
    }
    textarea{
        margin: 20px 0px 20px 0px;
        height: 70px;
        width: calc(100% - 22px);
        padding: 10px;
        resize: none;
        overflow-y: scroll;
    }
    button{
        margin-top: 20px;
        padding: 10px;
        font-size: 1.1rem;
        color: white;
        background-color: rgb(43, 42, 42);
        border: none;
        border-radius: 10px;
        transition-duration: 0.2s;
        cursor: pointer;
        margin: 0px 20px 50px 20px;
    }
    .comment{
        padding: 20px 20px 20px 30px;
        border-left: 5px solid rgb(43, 42, 42);
        margin-top: 20px;
        box-shadow: 0px 0px 50px -7px rgba(0,0,0,0.1);
        text-align: left;
        transition-duration: .1s;
    }
    .comment-info{
        display: flex;
        justify-content: space-between;
        color: rgb(0, 0, 0);
        font-size: .8rem;
        margin-bottom: 10px;
    }
    .comment-info span{
        cursor: pointer;
        color: rgb(255, 0, 0);
        font-weight: bold;
    }
    label{
        font-size: 0.8rem;
        font-weight: bold;
        color: rgb(109, 109, 109);
        text-align: left;
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }

</style> 
    
