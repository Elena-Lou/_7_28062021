<template>
  <div id="app">
    <nav>
       <ul class="navbar__list ">

          <li class="nav__list__item">
            <router-link to="/" class="nav__list__link">Accueil
            </router-link>
          </li>

        <div v-if="!isLoggedIn" class="navbar">
          <li class="nav__list__item">
            <router-link to="/signup" class="nav__list__link">Créez votre compte
            </router-link>
          </li>
        </div>

        <div v-if="isLoggedIn" class="navbar">
          <li class="nav__list__item">
            <router-link to="/profile" class="nav__list__link">
            </router-link>
          </li>

          <li class="nav__list__item">
            <a class="nav__list__link" href @click.prevent="logOut">Déconnexion
            </a>
          </li>
        </div>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
    name: 'Nav',

    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn
    }
    },

    methods: {
      logOut() {
        this.$store.dispatch("logOut");
        this.$router.push("/login");
        },

        getProfile(user_id){
          this.$router.push(`users/${user_id}`)
        }
    }
}

</script>

<style lang="scss" scoped>
#app {
  width: 70%;
  display: flex;
  justify-content: flex-end;
}

nav {
  width: 100%;
}
.navbar__list {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
  
</style>