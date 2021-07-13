<template>
  <div class="login">
      <h1>Connectez-vous</h1>
      <p>Veuillez renseigner vos identifiants de connexion</p>
    <LoginForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'Login',
  components: {
    LoginForm
  },
}
</script>