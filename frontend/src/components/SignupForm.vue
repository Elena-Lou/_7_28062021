<template>
    <div class="container">
        <form class="signup__form">

            <label for="name">Vous êtes :</label>
            <input v-model="name" id="name" type="text" placeholder="Albert Camus" required/>

            <label for="email">Votre adresse email :</label>
            <input name="email" v-model="email" id="email" type="email" placeholder="albertcamus@groupomania.com" required/> 

            <label for="password">Votre mot de passe :</label>
            <input name="password" v-model="password" id="password" type="text" placeholder="Mot de passe" required/>

            <button id="btn__signup" type="submit" @click.prevent="signup">S'inscrire</button>

        </form>
    </div>
</template>

<script>

import AuthService from "/services/auth.service";

export default {
    name: "SignupForm",

    data() {
    return {
      name:"",
      email: "",
      password: "",
    };
  },

  methods: {
    signup() {
        AuthService.signup({
          name: this.name,
          email: this.email,
          password: this.password
        })

        .then(res => {
          this.$store.dispatch("LoginSuccess", res.token);

          return res })

        .then(res => {this.$store.dispatch("setUser", res.user);
        console.log(res);
           return res })
        

         .then(res => {
          if (res.status === 201) { 
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