<template>
    <div class="profile">
        <h1>Bonjour {{ user.name }}</h1>

        <div class="profile__info">
            <p class="profile__email">Votre adresse email : {{ user.email }}</p>
        </div>

        <button class="profile__btn__delete" @click.prevent="deleteProfile()">Supprimez votre compte</button>

    </div>
</template>

<script>

import UserService from "/services/user-services";

export default {
    name: "Profile",

data() {
    return{
     name: "",
      email: "",
      user: {},
    }
  },
    
mounted(){
    this.getProfile();
  },

  methods: {
    getProfile(){
    const id = this.$route.params.id;
    UserService.getProfile(id)
      .then(res => {
        this.user = res.data[0];
        this.id = id;
      })
      .catch((e) => {
        console.log(e);
      })
    },

    deleteProfile(){
     
        const id = this.$route.params.id;

            UserService.deleteProfile(id)
            .then(
              localStorage.removeItem('userToken')
            )
      .catch((e) => {
        console.log(e);
      })
          
        
      }

}, 


}

</script>

<style lang="scss" scoped>

  
    .profile__btn__delete {
      border-radius: 10px;
      padding: 5px;
      color: red;
      margin-top: 30px;
      font-size: 1.3em;
      cursor: pointer;
    }

</style>