<template>
  <div class="post">
 
        <form class="post__form">

            <label class="post__form__label" for="post_title">Titre</label>
            <input class="post__form__input" name="title" v-model="title" id="new__post__title" type="text" placeholder="Titre de votre publication" required>

            <label class="post__form__label" for="post_content">Votre publication</label>
            <textarea class="post__form__text" name="text" v-model="text" id="form__post__content"></textarea>

            <button class="post__form__btn" @click.prevent="createPost" type="submit">Publier</button>
        </form>
    
  </div>

 
</template>

<script>

import PostService from "/services/post-services";

import {mapState} from "vuex";  

export default {
  name: "NewPost",

  data() {
    return {
      title: "",
      text: "",
    }
  },
  //gets user ID from the {user} stored
  computed: mapState({
    user: (state) => state.user.id, 
  }),

  methods: {
    createPost() {
      let userId = this.user.id;
      let data = { 
        title: this.title,
        text: this.text
      };

      let postData = (userId, data);
          
      PostService.createPost(postData)
        .then(res => {
          if (res.status === 201) { 
            setTimeout( () => this.$router.push("/posts"), 1500);
          } else {
            console.log("erreur d'envoi");
          }
        })
        .catch(e => {
          console.log(e);
      })
    }
  }
}
</script>

<style lang="scss" scoped> 

    .post {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: 5%;
      width: 80%;
      margin: auto;
      height: 300px;

        &__form {
          display: flex;
          flex-direction: column;
          text-align: center;

          &__label {
            font-weight: bold;
            font-size: 1.3em;
            margin-bottom: 10px;
          }

          &__input {
            font-size: 1.2rem;
            padding: 15px;
            text-align: center;
            width: 90%;
            margin: 0 auto 50px auto;
            border-radius: 5px;

              @media all and (min-width: 768px) {
                width: 50%
              }
          }

          &__text {
            width: 90%;
            height: 150px;
            margin: auto;
            resize: none;
            overflow-y: scroll;
            border-radius: 5px;
            font-size: 1.2em;

              @media all and (min-width: 768px) {
                width: 50%
              }
          }

          &__btn {
            width: 40%;
            margin: 20px auto;
            padding: 10px;
            font-size: 1.1em;
            color: white;
            background-color: #9b4747;
            border: none;
            border-radius: 10px;
            transition-duration: 0.25s;
            cursor: pointer;

            &:hover {
              transform: scale(1.05);
            }
          }
        }
    }  
  
</style>