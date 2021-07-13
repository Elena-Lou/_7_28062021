<template>
    <div class="container__comments">

        <form class="new__comment">
            <label for="new__comment"></label>
            <input id="new__comment" type="text" placeholder="Ecrire un commentaire..." required>
        </form>

        <div class="comments" v-if="comments.length > 0 ">
            <div class="comment" v-for="comment in comments" :key="comment.id">
                <div class="comment__info">
                    <span class="comment__info__date">{{ comment.date}}</span>
                    <span class="comment__info__author">{{ comment.user.name }}</span>
                </div>

                <div class="comment__content">
                    <p class="comment__text">{{ comment.text }}</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Comments",
}
</script>
