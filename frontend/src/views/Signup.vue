<template>
  <div class="signup">
    <h1>Bienvenue chez Groupomania !</h1>
      <p>Créez un profil et commencez à partager des publications</p>

    <form class="signup__form">

      <label class="signup__form__label" for="name">Vous êtes :</label>
      <input class="signup__form__input" v-model.trim="name" id="name" type="text" placeholder="Albert Camus" required/>

      <label class="signup__form__label" for="email">Votre adresse email :</label>
      <input class="signup__form__input" name="email" v-model.trim="email" id="email" type="email" placeholder="albertcamus@groupomania.com" required/> 

      <label class="signup__form__label" for="password">Votre mot de passe :</label>
      <input class="signup__form__input" name="password" v-model="password" id="password" type="text" placeholder="Mot de passe" required/>

        <button class="signup__form__btn" type="submit" @click.prevent="signup()">S'inscrire</button>

    </form>

      <div class="signup__form__router">
        <router-link to="/login" class="signup__form__link" title="Se connecter">Vous avez déjà un compte ? Connectez-vous !</router-link>
      </div>
      
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

  .signup {
    width: 100%;
    height: auto;

    &__form {
      width: 100%;
      margin: auto;
      display: flex;
      flex-direction: column;
      @media all and (min-width: 768px) {
        width: 60%
      }

      &__label {
        margin: 30px auto 10px;
        font-weight: bold;
      }

      &__input {
        font-size: 1.1em;
        padding: 15px;
        text-align: center;
        width: 80%;
        margin: auto;
        border-radius: 5px;
        
          @media all and (min-width: 768px) {
            width: 60%
          }
      }

      &__btn {
        width: 30%;
        margin: 20px auto;
        padding: 20px;
        font-size: 1.1em;
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

      &__link {
        color: #677a8d;
        padding: 50px 10px;
        font-style: italic;
        font-size: 1.15em;
      }
    }

  }


</style>