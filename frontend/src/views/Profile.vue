<template>
    <div class="profile">
        <h1>Bonjour {{ user.name }}</h1>

        <div class="profile__info">
            <p class="profile__email">Votre adresse email : {{ user.email }}</p>
        </div>

        <button class="delete__profile" @click.prevent="deleteProfile">Supprimer votre compte</button>

    </div>
</template>

<script>

import UserService from "../services/user-services";

export default {
    name: "Profile",

mounted(){
    this.getProfile();
  },

  methods: {
    getProfile(){
    const userId = this.$route.params.id;
    UserService.getProfile(userId)
      .then(res => {
        this.user = res.data[0];
        this.id = userId;
      })
      .catch((e) => {
        console.log(e);
      })
    },

}, 

deleteUser(){
      if(window.confirm("Attention !! Vous êtes au point de supprimer votre compte définitivement !")){
        const userId = this.$route.params.id;

            UserService.deleteProfile(userId)
            .then((res) => {
              this.deleteMessage = res.data.message;
              setTimeout(function() {location.href = '/user/signup';}, 2000)
              localStorage.removeItem('userToken');
            })
            .catch((e) => {
              if (e.response.status === 500) {
              this.deleteMessage = "La suppression de compte a échoué !";
              setTimeout(function() {location.reload()}, 2000)
              }
            })
          
        }
      }
}

</script>