<template>
  <div id="app">
    <nav>
       <ul class="navbar__list ">

          <li class="nav__list__item">
            <router-link to="/home" class="nav__list__link">Accueil
            </router-link>
          </li>

        <div v-if="!currentUser" class="navbar">
          <li class="nav__list__item">
            <router-link to="/signup" class="nav__list__link">Créez votre compte
            </router-link>
          </li>

          <li class="nav__list__item">
            <router-link to="/login" class="nav__list__link">Connexion
            </router-link>
          </li>

        </div>

        <div v-if="currentUser" class="navbar">
          <li class="nav__list__item">
            <router-link to="/profile" class="nav__list__link">
              {{ currentUser.username }}
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
        currentUser() {
        return this.$store.state.auth.user;
        }    
    },

    methods: {
        logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
        }
    }
}

</script>

<style lang="scss" scoped>
  
</style>