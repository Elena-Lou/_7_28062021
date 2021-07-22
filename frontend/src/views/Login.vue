<template>

    <div class="login">
      <h1>Connectez-vous pour lire les dernières publications de vos collègues</h1>
     
        <form class="login__form">

            <label class="login__form__label" for="email">Votre adresse email :</label>
            <input class="login__form__input" name="email" v-model="email" id="email" type="email" placeholder="albertcamus@groupomania.com" required> 

            <label class="login__form__label" for="password">Votre mot de passe :</label>
            <input class="login__form__input" name="password" v-model="password" id="password" type="text" placeholder="Mot de passe" required/>

            <button class="btn__login" @click.prevent="login()" type="submit">Se connecter</button>

        </form>

            <div class="login__form__router">
                <router-link class="login__form__link" to="/signup" id="signup" title="Créer un compte">Vous n'avez pas encore de compte ? Inscrivez-vous !</router-link>
            </div>
    </div>

</template>

<script>
import UserService from "/services/user-services";  
               
export default {
    name: "Login",
    data() {
        return {
          email : "",
          password : ""
        }
    },
    mounted() {                                       
      this.$store.dispatch("setAuthUser", {});
      this.$store.dispatch("setToken", null);  
    },
    
  methods: {
    login() {
        UserService.login({
          email: this.email,
          password: this.password
        })
      .then((res) => {
          console.log(res);
        this.$store.dispatch("setAuthUser", res.data.user);
        this.$store.dispatch("setToken", res.data.token);  
        this.$router.push('/posts');                          
      })
      .catch((e) => {
        if (e.response.status === 401) {
        this.message = "E-mail ou mot de passe incorrect";
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped>

  .login__form {
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    @media all and (min-width: 768px) {
      width: 60%
    }

    &__label {
      color: #677a8d;
      margin: 30px auto 10px;
      font-weight: bold;
    }

    &__input {
      font-size: 1.1em;
      padding: 15px;
      border-radius: 5px;
      text-align: center;
      width: 80%;
      margin: auto;

        @media all and (min-width: 768px) {
          width: 60%
        }
    }

    &__link {
        color: #677a8d;
        padding: 50px 10px;
        font-style: italic;
        font-size: 1.15em;
      }
  }


  .btn__login {
    width: 40%;
    margin: 20px auto;
    padding: 10px;
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

</style>

