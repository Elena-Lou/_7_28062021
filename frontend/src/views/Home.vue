<template>

  <div class="home">

    <h1>Bienvenue sur le réseau social de l'entreprise Groupomania</h1>

        <div class="router">
          <router-link to="/login">Connexion</router-link>
          <router-link to="/signup">Inscription</router-link>
        </div>

    <img src="../assets/logo.png" alt="Logo Groupomania">

    </div>

</template>

<script>
export default {
  name: "Home"
}
</script>

<style lang="scss" scoped>

.home {
  width: 80%;
  margin: auto;
  padding-bottom: 200px;
}

.home img {
  width: 50%;
}

.router {
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.5em;

  @media all and (min-width: 768px) { 
    flex-direction: row;  
  }
}
</style>
