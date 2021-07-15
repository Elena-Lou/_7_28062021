<template>
    <div class="posts">
        <article class="post" v-for="post in posts" :key="post.id">
            <router-link :to="'/posts/' + post.id">
                <div class="post__header">
                    <h2 class="post__title">{{ post.title }}</h2>
                    <div class="post__info">
                        <span class="post__info__date">{{ post.date }}</span>
                        <span class="post__info__author">{{ post.user.name }}</span>
                        </div>
                </div>

                <div class="post__content">
                    <p class="post__text">{{ post.text }}</p>
                </div>
            </router-link>
        </article>
    </div>
</template>

<script>
// import axios from "axios";

export default {
    name: "Posts",

    // methods: {
    //     getAllPosts() {
    //         axios.get(`http://localhost:3000/api/posts/`,
    //         {
    //             headers: {
    //                 'content-type': 'application/json',
    //                 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImFkbWluIjowLCJpYXQiOjE2MjYyNzc1NTIsImV4cCI6MTYyNjM2Mzk1Mn0.sLLuIK-UvJzNeWqtN6ioXXyuoRlL-HwEPbRk8665EVI'
    //             }
    //         }
    //         )
    //         .then(res => {this.posts = res.data} )
    //     }
    // }
    
}
</script>

<style lang="scss" scoped>

</style>
