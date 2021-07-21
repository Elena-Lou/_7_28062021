<template>
  <div class="signup">

        <form class="signup__form">

            <label for="name">Vous êtes :</label>
            <input v-model.trim="name" id="name" type="text" placeholder="Albert Camus" required/>

            <label for="email">Votre adresse email :</label>
            <input name="email" v-model.trim="email" id="email" type="email" placeholder="albertcamus@groupomania.com" required/> 

            <label for="password">Votre mot de passe :</label>
            <input name="password" v-model="password" id="password" type="text" placeholder="Mot de passe" required/>

            <button id="btn__signup" type="submit" @click.prevent="signup()">S'inscrire</button>

            <div class="btn-signup-page">
            <router-link to="/login" class="connexion btn btn-secondary mx-5" title="Se connecter">Vous avez déjà un compte ? Connectez-vous !</router-link>
            </div>

        </form>
    </div>
</template>

<script>

import UserServices from "/services/user-services.js"

export default {
  name: 'Signup',

 data() {
    return {
      name:"",
      email: "",
      password: "",
    };
  },

  methods: {
    signup() {
        UserServices.signup({
          name: this.name,
          email: this.email,
          password: this.password
        })
          
          .then(res => {
            if (res.status === 201) {
            console.log(res.data.message);
            this.$router.push("/login");
            } else {
              console.log("erreur");
            }
          })

      .catch(e => {
        console.log(e);
      })    
    }
  }
}

</script>