<template>
  <div class="signup">
      <h2>Bienvenue !</h2>
        <p>Veuillez renseigner les informations ci-dessous pour compléter votre profil et commencer à échanger avec vos collègues</p>
    <SignupForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import SignupForm from '../components/SignupForm.vue';

export default {
  name: 'Signup',
  components: {
    SignupForm
  }

}
</script>