<template>
  <div class="header">

      <nav>

          <ul class="navbar__list ">

          <li class="nav__list__item">
           <router-link to="/posts" id="posts" title="Voir les publications">Les publications</router-link>

          </li>


          <li class="nav__list__item">
            <router-link to="/post" id="newpost" title="Créez une publication">Créer une publication</router-link>
          </li>



          <li class="nav__list__item">
            <router-link to="'/profile', params: {{ id: sessionUserId }}" id="user-profile" title="Voir ou modifier mon compte">Mon profil</router-link>
          </li>

          <li class="nav__list__item">
             <button @click.prevent="deconnecter()"  href="#" title="Déconnexion">Se déconnecter</button>
          </li>

      </ul>
    </nav>


      <div class="role" v-if="isAdmin === 1">Modérateur</div>    
      
 
  </div>
</template>

<script>

import jwt from 'jsonwebtoken';
import {mapState} from "vuex";
import UserServices from '../services/user-services';
export default {
  name: "Header",
  
  data() {
    return {
      user: [],
    }
  },
  computed: mapState({
    sessionUserId : (state) => state.sessionUserId,
    adminUser : (state) => state.isAdmin
  }),
  mounted () {
    const token = localStorage.getItem('userToken');
    const decodedToken = jwt.decode(token);   
    const sessionUserId = decodedToken.userId;
    const admin = decodedToken.admin;
    this.$store.dispatch('setAuthUser', sessionUserId);
    this.$store.dispatch('setAdmin', admin);
  },
  methods: {
    getProfile(){
    let userId = this.sessionUserId;
    let adminAcces = adminAcces;
    UserServices.getOneUser(userId)
      .then(res => {
        this.user = res.data[0];
      })
    },
    deconnecter() {
        localStorage.removeItem('userToken');
        location.href = '/';
    }
  }
}
</script>