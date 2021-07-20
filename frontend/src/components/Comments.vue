<template>
    <div class="container__comments">

        <form class="new__comment">
            <label for="new__comment"></label>
            <input v-model="comment_content" id="new__comment" type="text" placeholder="Ecrire un commentaire..." required>
        </form>

        <div class="comments" v-if="comments.length > 0 ">
            <div class="comment" v-for="comment in comments" :key="comment.id">
                <div class="comment__info">
                    <span class="comment__info__date">{{ comment.date}}</span>
                    <span class="comment__info__author">{{ comment.user.name }}</span>
                </div>

                <div class="comment__content">
                    <p class="comment__text">{{ comment.text }}</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import UserService from "/services/user.service";

export default {
    name: "Comments",
    
    data() {
        return {
            comment_content: "",
            post_id: "",
            user: ""
        }
    },

    methods: {
        createComment(){
            const post_id = this.$route.params.id;
            UserService.createComment({
            comment_content: this.comment_content,
            post_id: post_id,
            user: this.$store.state.user
        
            })
             .then(response => {
                this.$store.dispatch("createComment", response.data);
                return response
            })

            .then(res => {
          if (res.status === 201) { 
            this.$router.push(`/posts/${post_id}`)

          } else {
            return ({message: "une erreur s'est produite, veuillez recommencer"})
          }
        })
        
       .catch(error => {
            console.log(error)})
        }
    }
}

</script>
