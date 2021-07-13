<template>
    <div class="container">
        <form class="login__form">
            
            <label for="email">Votre adresse email :</label>
            <input id="email" type="text" placeholder="albertcamus@groupomania.com" required> 

            <label for="password">Votre mot de passe :</label>
            <input id="password" type="text" placeholder="Mot de passe" required/>

            <button id="btn__login" type="submit">Se connecter</button>
        </form>
    </div>
</template>

<script>

export default {
    name: "LoginForm",
}
</script>
