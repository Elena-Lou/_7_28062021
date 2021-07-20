<template>

    <div class="login__form">
     
        <form class="login__form">

            <label for="email">Votre adresse email :</label>
            <input name="email" v-model="email" id="email" type="email" placeholder="albertcamus@groupomania.com" required> 

            <label for="password">Votre mot de passe :</label>
            <input name="password" v-model="password" id="password" type="text" placeholder="Mot de passe" required/>

            <button id="btn__login" @click.prevent="login" type="submit">Se connecter</button>

        </form>

            <div class="signup__link">
                <p>Vous n'avez pas encore de compte ?
                  <router-link to="/signup" id="signup" title="Créer un compte">S'inscrire</router-link>
                </p>
            </div>
    </div>

</template>

<script>
import UserService from "../services/user-services";  
               
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
        location.reload();
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