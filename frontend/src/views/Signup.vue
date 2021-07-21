<template>
  <div class="signup">

        <form class="signup__form">

            <label class="signup__form__label" for="name">Vous êtes :</label>
            <input class="signup__form__input" v-model.trim="name" id="name" type="text" placeholder="Albert Camus" required/>

            <label class="signup__form__label" for="email">Votre adresse email :</label>
            <input class="signup__form__input" name="email" v-model.trim="email" id="email" type="email" placeholder="albertcamus@groupomania.com" required/> 

            <label class="signup__form__label" for="password">Votre mot de passe :</label>
            <input class="signup__form__input" name="password" v-model="password" id="password" type="text" placeholder="Mot de passe" required/>

            <button class="btn__signup" type="submit" @click.prevent="signup()">S'inscrire</button>

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

<style lang="scss" scoped>

  .signup__form {
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    @media all and (min-width: 768px) {
      width: 60%
    }

    &__label {
      color: rgba(0, 0, 0, .5);
      margin: 10px;
      font-weight: bold;
    }

    &__input {
      font-size: 1.05rem;
      padding: 10px;
      margin-bottom: 15px;
      text-align: center;
      width: 80%;
      margin: auto;
    }
  }


  .btn__signup {
      width: 30%;
      margin: 20px auto;
      padding: 10px;
      font-size: 1.1rem;
      color: white;
      background-color: #9b4747;
      border: none;
      border-radius: 10px;
      transition-duration: 0.25s;
      cursor: pointer;

      &:hover {
        transform: scale(1.05);
      }
  }

</style>