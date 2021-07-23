<template>
    <div class="comment">
      
        <form class="comment__form">

            <label for="comment__form__label">Laissez un commentaire :</label>
            <textarea class="comment__form__text" name="comment__form__text" v-model="text" id="form__post__text" placeholder="Votre commentaire..." required></textarea>

            <button class="comment__form__btn" @click.prevent="createComment" type="submit" id="send-comment">Envoyer</button>
        
        </form>

        <h3 v-if="comments.length > 0">Commentaires :</h3>

                <div class="comments" v-for="comment in comments" :key="comment.id" >
                    <span>Par {{comment.name}} le {{dateFormat(comment.date)}}</span>
                    <p class="comments__text">{{comment.text}}</p>
                    <!-- <span @click="deleteComment(comment.id)" v-if="user.admin" :key="comment.id">Supprimer</span> -->
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
        user: (state) => state.user, 
    }),

    beforeMount() { 
        this.getAllComments();
    },

    methods: {
        createComment(){
            let commentData = { 
            text: this.text
            };

            let postId = this.$route.params.id

            CommentService.createComment(postId, commentData)
                .then(res => {
                    if (res.status === 201) { 
                        setTimeout( () => this.getAllComments(), 1000 );
                    } else {
                        console.log("erreur d'envoi");
                    }
                })
                .catch(e => {
                    console.log(e);
                })

        },

        getAllComments() {
            const postId = this.$route.params.id;
            CommentService.getAllComments(postId)
              .then(res => {
                this.comments = res.data;
                console.log(res.data.comment.id);
            })
            .catch((e) => {
                if (e.response.status === 400) {
                  console.log("Il n'y a pas de commentaires");
                }
            })
        },

        deleteComment() {
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

    .comment {
        width: 100%;
        margin: auto;

        &__form {
            width: 50%;
            margin: auto;
            display: flex;
            flex-direction: column;

            &__label {
                text-align: left;
                font-size: 0.8rem;
                font-weight: bold;
                color: rgb(109, 109, 109);
                text-align: left;
            }

            &__text {
                margin: 20px 0px 20px 0px;
                height: 70px;
                padding: 10px;
                resize: none;
                overflow-y: scroll;
            }

            &__btn {
                min-width: 65px;
                margin: 20px auto;
                padding: 8px;
                font-size: 0.9em;
                color: white;
                background-color: #9b4747;
                border: none;
                border-radius: 10px;
                cursor: pointer;
            }
        }
    }

    h3 {
        text-align: left;
        width: 80%;
        margin: auto;
        padding-bottom: 15px;
    }

    .comments {
        width: 80%;
        text-align: left;
        margin: auto;
        padding: 10px;

        & span {
            font-style: italic;
            font-size: 0.8em;
        }

    }

</style> 
    
