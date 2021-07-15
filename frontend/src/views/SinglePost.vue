<template>
    <div class="singlepost">

        <Post/>

        <Comments/>

    </div>
</template>

<script>
import Post from "../components/Post.vue";
import Comments from "../components/Comments.vue"

export default {
    name: "SinglePost",

    components: {
        Post,
        Comments
    }
}

</script>
