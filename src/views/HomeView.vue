<script setup>

import {onMounted} from "vue";
import {amiiboList, useAmiiboListStore} from "@/stores/amiibo.js";
import AmiiboCard from "@/components/AmiiboCard.vue";

const store = useAmiiboListStore();
const {fetchAmiiboList, loadMoreAmiibos} = store;

onMounted(() => {
  fetchAmiiboList();
});
</script>

<template>
  <div id="page-wrapper">
    <!-- Banner -->
    <section id="banner">
      <header>
        <h2>Hey.Bienvenue sur ma collection</h2>
      </header>
    </section>

    <!-- Intro -->
    <!-- ici vous pouvez choisir 3 amiibos au hasard ou juste vos trois préférés -->
    <section id="intro" class="container">
      <div class="row">

        <AmiiboCard v-for="amiibo in amiiboList.slice(0, 3)" :key="amiibo.head + amiibo.tail" :amiibo="amiibo"/>
      </div>
      <footer>
        <ul class="actions">
          <li>
            <router-link :to="{name: 'liste-amiibo'}" class="button large">Liste complète</router-link>
          </li>
        </ul>
      </footer>
    </section>
  </div>
</template>
