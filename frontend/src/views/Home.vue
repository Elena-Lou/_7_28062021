<template>

  <div class="home">
    <h1>Bienvenue</h1>

        <div class="router">
          <router-link to="/login">Connexion</router-link>
          <router-link to="/signup">Inscription</router-link>
        </div>

    </div>

</template>

<script>
export default {
  name: "Home"
}
</script>
