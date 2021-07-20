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

import AuthService from "/services/auth.service";

export default {
    name: "Profile",


    methods: {
      deleteProfile(){
        const user_id = this.$route.params.id;
         AuthService.deleteProfile(user_id) 
            .then(() => {
              this.$store.dispatch("deletePrifile", user_id)
            })

            .then(() => {
              this.$router.push("/")
            })        
      }

    }
}
</script>
