<script setup>
import { useRoute } from "vue-router";
const $route = useRoute();

console.log($route.path);
</script>

<template>
    <section id="header">

    <!-- Logo -->
        <h1>Home</h1>

    <!-- Nav -->
        <nav id="nav">
            <ul>
                <li :class="$route === '/' ? 'current' : ''">
                    <router-link :to="{ name: 'home'}">Home</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'liste-amiibo'}">Liste Amiibo</router-link>
                </li>
            </ul>
        </nav>
    </section>
</template>