<template>

    <div class="login">
      <h1>Connectez-vous pour lire les dernières publications de vos collègues</h1>
     
        <form class="login__form">

            <label class="login__form__label" for="email">Votre adresse email :</label>
            <input class="login__form__input" name="email" v-model="email" id="email" type="email" placeholder="albertcamus@groupomania.com" required> 

            <label class="login__form__label" for="password">Votre mot de passe :</label>
            <input class="login__form__input" name="password" v-model="password" id="password" type="text" placeholder="Mot de passe" required/>

            <button id="btn__login" @click.prevent="login()" type="submit">Se connecter</button>

        </form>

            <div class="signup__link">
                <p>Vous n'avez pas encore de compte ?
                  <router-link to="/signup" id="signup" title="Créer un compte">S'inscrire</router-link>
                </p>
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
      localStorage.removeItem('userToken');    
    },
  methods: {
    login() {
        UserService.login({
          email: this.email,
          password: this.password
        })
      .then((res) => {
        localStorage.setItem('userToken', res.data.token),   
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
    width: 70%;
    margin: auto;
    display: flex;
    flex-direction: column;

    &__label {
      color: rgba(0, 0, 0, .5);
      margin: 10px;
    }

    &__input {
      font-size: 1.05rem;
      padding: 10px;
      margin-bottom: 15px;
      text-align: center;
    }
  }


    #login-btn{
        padding: 10px;
        font-size: 1.1rem;
        color: white;
        background-color: rgb(43, 42, 42);
        border: none;
        border-radius: 10px;
        transition-duration: 0.2s;
        cursor: pointer;
    }
    #login-btn:hover{
        transform: scale(1.025);
    }

    label{
        font-size: 0.8rem;
        font-weight: bold;
        color: rgb(109, 109, 109);
        text-align: left;
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }

</style>

