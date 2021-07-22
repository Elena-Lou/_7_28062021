<template>
  <div class="header">

    <div class="logo">
      <img src="../assets/logo-left-white.png" alt="logo rouge Groupomania">
    </div>

    <nav class="nav">

      <ul class="nav__list ">

        <li v-if="token" class="nav__list__item">
          <router-link to="/posts" id="posts" title="Voir les publications">Les publications</router-link>
        </li>

        <li v-if="token" class="nav__list__item">
          <router-link to="/post" class="nav__list__link" id="newpost" title="Créez une publication">Créer une publication</router-link>
        </li>

        <li v-if="token" class="nav__list__item">
          <router-link :to=" `/user/${user.id}`" id="profile" class="nav__list__link" title="Voir ou modifier mon compte">Mon profil</router-link>
        </li>

        <li v-if="token" class="nav__list__item">
          <button class="nav__list__btn" @click.prevent="logout()" title="Déconnexion">Se déconnecter</button>
        </li>

      </ul>

    </nav>
 
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "Header",
  //checks token and {user} stored 
  computed: mapState({
    user: (state) => state.user,
    token : (state) => state.token
  }),

  methods: {
    //sets store states to null and redirects towards login page
    logout() {
        this.$store.dispatch("setAuthUser", {});
        this.$store.dispatch("setToken", null);
        this.$router.push("/")
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
    font-size: 1.2em;
  }

  .header img {
    width: 100%;
    height: 170px;
  }

  .nav {
    width: 70%;

    &__list {
      display: flex;
      width: 100%;
      justify-content: space-evenly;
      list-style: none;
      align-items: center;

      &__btn {
        padding: 20px;
        font-size: 1.1em;
        color: #9b4747;
        border: none;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }

</style>