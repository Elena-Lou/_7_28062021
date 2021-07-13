<template>
    <div class="container">
        <form class="signup__form">
            <label for="name">Vous êtes :</label>
            <input id="name" type="text" placeholder="Albert Camus" required/>

            <label for="email">Votre adresse email :</label>
            <input id="email" type="text" placeholder="albertcamus@groupomania.com" required> 

            <label for="password">Votre mot de passe :</label>
            <input id="password" type="text" placeholder="Mot de passe" required/>

            <label for="password__confirmation">Veuillez confirmer votre mot de passe :</label>
            <input id="password__confirmation" type="text" placeholder="Mot de passe" required>

            <button id="btn__signup" type="submit">S'inscrire</button>
        </form>
    </div>
</template>

<script>

export default {
    name: "SignupForm",
}
</script>
