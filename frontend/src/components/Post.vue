<template>
    <div class="post__header">
       <h2 class="post__title">{{ post.title }}</h2>
            <span class="post__date">{{ post.date }}</span>
            <span class="post__author">{{ post.user.name }}</span>

            <div class="post__content">
                <p class="post__text">{{ post.text }}</p>
            </div>
            <div class="post__actions">
                <button v-if="$store.state.user.id == $store.state.post.user.id || $store.state.isAdmin == true" @click.prevent="modifyPost">Modifier</button>
                <button v-if="$store.state.user.id == $store.state.post.user.id || $store.state.isAdmin == true" @click.prevent="deletePost">Supprimer</button>
            </div>
    </div>

</template>

<script>
import UserService from "/services/user.service";

export default {
    name: "Post",


    methods: {

        modifyPost(){
            const post_id = this.$route.params.id;
            UserService.modifyPost(post_id, {
                post_title: this.post.title,
                post_content: this.post.content
            })
           .then(response => {
               this.$store.dispatch("modifyPost", response.data, post_id)
           })
           .catch(error => {
            console.log(error)})
        },

        deletePost() {
            const post_id = this.$route.params.id;
            UserService.deletePost(post_id)
                .then(() => {
                    this.$store.dispatch("deletePost", post_id)
                })
                .then(() => {
                    this.$router.push("/")
                })
        }

    }
}

</script>
