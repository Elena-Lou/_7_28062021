<template>

    <div class="login__form">
     
        <form class="login__form">

            <label for="email">Votre adresse email :</label>
            <input name="email" v-model="email" id="email" type="email" placeholder="albertcamus@groupomania.com" required> 

            <label for="password">Votre mot de passe :</label>
            <input name="password" v-model="password" id="password" type="text" placeholder="Mot de passe" required/>

            <button id="btn__login" @click.prevent="login" type="submit">Se connecter</button>

        </form>
    </div>

</template>

<script>

import AuthService from "/services/auth.service";

export default {
    name: "LoginForm",

    data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    login() {
        AuthService.login({
          email: this.email,
          password: this.password
        })

        .then(res => {
          this.$store.dispatch("LoginSuccess", res.token);
          return res })

        .then(res => {
          this.$store.dispatch("setUser", res.user);
          console.log(res);
           return res })

        .then(res => {
          if (res.status === 200) { 
            this.$router.push("/")

          } else {
            return this.$router.push("/login")
          }
        })
        
       .catch(error => {
            console.log(error)})
    }
  }
};
</script>