<template>
    <div class="container">
        <form class="signup__form">

            <label for="name">Vous êtes :</label>
            <input v-model="user.name" id="name" type="text" placeholder="Albert Camus" v-validate="required"/>

            <label for="email">Votre adresse email :</label>
            <input name="email" v-model="user.email" id="email" type="text" placeholder="albertcamus@groupomania.com" v-validate="required"> 

            <label for="password">Votre mot de passe :</label>
            <input name="password" v-model="user.password" id="password" type="text" placeholder="Mot de passe" required/>

            <button id="btn__signup" type="submit" @submit.prevent="handleSignup">S'inscrire</button>

            <div v-if="message" class="signup__form__message" role="alert">{{message}}</div>
        </form>
    </div>
</template>

<script>
import User from '../models/user';

export default {
    name: "SignupForm",

    data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleSignup() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/signup', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }


}
</script>
