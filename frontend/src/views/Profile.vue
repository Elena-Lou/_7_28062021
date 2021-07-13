<template>
    <div class="profile">
        <h1>Bonjour {{ user.name }}</h1>

        <div class="profile__info">
            <p class="profile__email">Votre adresse email : {{ user.email }}</p>
        </div>

        <button class="delete__profile">Supprimer votre compte</button>

    </div>
</template>

<script>

export default {
    name: "Profile",
}
</script>
