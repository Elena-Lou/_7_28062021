<template>
    <div class="profile">
        <h1>Bonjour {{ user.name }}</h1>

        <button class="profile__btn__delete" @click.prevent="deleteProfile()">Supprimez votre compte</button>

    </div>
</template>

<script>

import UserService from "/services/user-services";
import {mapState} from "vuex";

export default {
    name: "Profile",
//user's data accessed through {user} stored
  computed: mapState({
    user: (state) => state.user,
  }),

  methods: {
    deleteProfile(){
      const id = this.user.id;

      UserService.deleteProfile(id)
        .then( () => { //empties store and redirects towards signup page
          this.$store.dispatch("setAuthUser", {})
          this.$store.dispatch("setToken", null)
          this.$router.push("/signup")
        })
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