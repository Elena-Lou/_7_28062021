<template>
    <div class="new__post__container">
        <form class="new__post">

            <label for="new__post__title">Titre</label>
            <input name="post_title" v-model="post_title" id="new__post__title" type="text" placeholder="Titre de votre publication" required>

            <label for="new__post__content">Votre publication</label>
            <textarea name="post_content" v-model="post_content" id="new__post__content"></textarea>

            <button id="new__post__btn" @click.prevent="createPost" type="submit">Publier</button>
        </form>
    </div>
</template>

<script>

import UserService from "/services/user.service";

export default {
    name: "NewPost",

    data() {
        return {
            post_title: "",
            post_content: "",

        };
    },

    methods: {
        createPost() {
            UserService.createPost({
                post_title: this.post_title,
                post_content: this.post_content,
                user: this.$store.state.user
            })

            .then(response => {
                this.$store.dispatch("createPost", response.data);
                return response
            })

            .then(res => {
          if (res.status === 201) { 
            this.$router.push("/")

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

<style lang="scss" scoped>
form {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: auto;
    height: 200px;
    justify-content: space-between;
}
</style>
