<template>

    <div class="login">
      <h2>Connectez-vous</h2>

      <p>Veuillez renseigner vos identifiants de connexion</p>
      
        <form class="login__form">

            <label for="name">Votre nom:</label>
            <input name="name" v-model="user.name" id="name" type="text" placeholder="Albert Camus" v-validate= "required"> 
            
            <label for="email">Votre adresse email :</label>
            <input name="email" v-model="user.email" id="email" type="text" placeholder="albertcamus@groupomania.com" v-validate= "required"> 

            <label for="password">Votre mot de passe :</label>
            <input name="password" v-model="user.password" id="password" type="text" placeholder="Mot de passe" v-validate= "required"/>

            <button id="btn__login" @submit.prevent="submitLogin" type="submit" :disabled="loading">
                <span v-show="loading" class="btn__loader"></span>
                <span>Se connecter</span>
            </button>

            <div v-if="message" class="login__form__message" role="alert">{{message}}</div>
        </form>

    </div>
</template>

<script>
import User from '../models/user';

export default {
    name: "LoginForm",

    data() {
        return {
        user: new User('', '', ''),
        loading: false,
        message: ''
        };
    },

     computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/posts');
    }
  },
  methods: {
    submitLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
           return;
        }

        if (this.email && this.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/profile');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }

}
</script>
