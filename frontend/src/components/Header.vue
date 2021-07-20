<template>
    <div class="header">
        <img src="../assets/icon-left-font-monochrome-white.png" alt="logo Groupomania">
        <Nav/>
    </div>
</template>

<script>
import Nav from "../components/Nav.vue"

export default {
    name: "Header",

    components: {
        Nav
    }
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    background-color: darkgrey;
    height: 100px;
}
img {
    width: 30%;
    height: auto;
}

</style>
