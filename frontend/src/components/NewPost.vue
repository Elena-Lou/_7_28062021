<template>
    <div class="new__post__container">
        <form class="new__post">

            <label for="new__post__title">Titre</label>
            <input id="new__post__title" type="text" placeholder="Titre de votre publication" required>

            <label for="new__post__content">Votre publication</label>
            <textarea id="new__post__content"></textarea>

            <button id="new__post__btn" type="submit">Publier</button>
        </form>
    </div>
</template>

<script>

export default {
    name: "NewPost",
}
</script>
