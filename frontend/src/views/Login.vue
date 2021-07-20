<template>

    <div class="login">
            
        <h2>Connectez-vous</h2>

            <p>Veuillez renseigner vos identifiants de connexion</p>

            <LoginForm/>

    </div>

</template>

<script>
import LoginForm from "../components/LoginForm.vue"

export default {
  name: 'Login',
  components: {
    LoginForm
  },
}
</script>
