<template>
  <div class="new__post">


    <div class="new__post__container">
        <form class="new__post">

            <label for="new__post__title">Titre</label>
            <input name="post_title" v-model="post_title" id="new__post__title" type="text" placeholder="Titre de votre publication" required>

            <label for="new__post__content">Votre publication</label>
            <textarea name="post_text" v-model="post_text" id="new__post__content"></textarea>

            <button id="new__post__btn" @click.prevent="createPost" type="submit">Publier</button>
        </form>
    </div>
  </div>

 
</template>

<script>
import PostService from "/services/post-services";

import {mapState} from "vuex";  
                    // Importation données de Vuex store
export default {
  name: "NewPost",

  data() {
    return {
      post_title: "",
      post_text: "",
    }
  },

  computed: mapState({
    sessionUserId : (state) => state.sessionUserId, 
    isAdmin : (state) => state.isAdmin
  }),

  methods: {
    createPost() {
      let userId = this.sessionUserId;
      const formCreate = document.getElementsByClassName("formCreate")[0];
      let data = new FormData(formCreate);
      let postData = (userId, data);
          
      PostService.createPost(postData)
      .then(res => {
        if (res) {
          setTimeout( () => this.$router.go(), 2500);
        }
      })
      .catch(e => {
          console.log(e);
      })
    }
  }
}
</script>