<template>
    <div class="post__header">
       <h2 class="post__title">{{ post.title }}</h2>
            <span class="post__date">{{ post.date }}</span>
            <span class="post__author">{{ post.user.name }}</span>

            <div class="post__content">
                <p class="post__text">{{ post.text }}</p>
            </div> 
    </div>

</template>

<script>

export default {
    name: "Post",

}

</script>
