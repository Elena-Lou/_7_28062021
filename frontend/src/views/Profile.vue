<template>
    <div class="profile">
        <h1>Bonjour {{ currentUser.name }}</h1>

        <div class="profile__info">
            <p class="profile__email">Votre adresse email : {{ currentUser.email }}</p>
        </div>

        <button class="delete__profile">Supprimer votre compte</button>

    </div>
</template>

<script>

export default {
    name: "Profile",
     computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
}
</script>
