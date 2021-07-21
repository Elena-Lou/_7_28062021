<template>
  <div class="header">

    <div class="logo">
      <img src="../assets/logo-left-white.png" alt="logo rouge Groupomania">
    </div>

      <nav class="navbar">

          <ul class="navbar__list ">

          <li v-if="connected" class="nav__list__item">
           <router-link to="/posts" id="posts" title="Voir les publications">Les publications</router-link>

          </li>


          <li v-if="connected" class="nav__list__item">
            <router-link to="/post" class="nav__list__link" id="newpost" title="Créez une publication">Créer une publication</router-link>
          </li>



          <li v-if="connected" class="nav__list__item">
            <router-link :to=" `/user/${sessionUserId}`" id="profile" class="nav__list__link" title="Voir ou modifier mon compte">Mon profil</router-link>
          </li>

          <li v-if="connected" class="nav__list__item">
             <button @click.prevent="logout()" title="Déconnexion">Se déconnecter</button>
          </li>

      </ul>
    </nav>

      
 
  </div>
</template>

<script>

import {mapState} from "vuex";
import UserServices from "/services/user-services";

export default {
  name: "Header",
  
  data() {
    return {
      user: [],
      connected: true
    }
  },
  computed: mapState({
    sessionUserId : (state) => state.sessionUserId,
    isAdmin : (state) => state.isAdmin
  }),

  created(){
    this.checkConnected()
  },
  
  methods: {
    checkConnected(){
      const token = localStorage.getItem("userToken");
      if(!token){
        this.connected = false;
        console.log("utilisateur non connecté");
      } else if(token) {
        this.connected = true;
        console.log("utilisateur connecté");
      }
    },

    getProfile(){
    let userId = this.sessionUserId;
    UserServices.getProfile(userId)
      .then(res => {
        this.user = res.data[0];
      })
    },

    logout() {
        localStorage.removeItem('userToken');
        location.href = '/';
    }
  }
}
</script>

<style lang="scss">
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #9b4747;
    color: white;

  }

  .header img {
    width: 100%;
    height: 170px;

  }

  .navbar {
    width: 70%;

    &__list {
      display: flex;
      width: 100%;
      justify-content: space-evenly;
      list-style: none;

      &__link {
      text-decoration: none;
      }

    }


  }

</style>