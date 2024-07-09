<script setup>
import {useAmiiboListStore} from '@/stores/amiibo.js'
import {storeToRefs} from "pinia";

const store = useAmiiboListStore();
const { fetchAmiiboList, loadMoreAmiibos } = store;
const {error, loading, displayedAmiiboList, pageCount, currentPage} = storeToRefs(store);
</script>

<template>
  <div id="page-wrapper">
    <!-- Main -->
    <section id="main">
      <div class="container">

        <div v-if="loading">Chargement...</div>
        <div v-if="error">Erreur: {{ error.message }}</div>
        <!-- Content -->
        <article class="box post" v-if="displayedAmiiboList">
          <header>
            <h2>Ma Collection (10 par 10)</h2>
            <p>Page {{ currentPage }}/{{ pageCount }} </p>
          </header>
          <p>
            <table>
              <tr>
                <th>Character</th>
                <th>game Series</th>
                <th>Action</th>
              </tr>
              <tr v-for="amiibo in displayedAmiiboList" :key="amiibo.head + amiibo.tail">
                <td>{{ amiibo.name }}</td>
                <td>{{ amiibo.amiiboSeries }}</td>
                <td>
                  <router-link :to="{ name: 'amiibo-details', params: { elementId: amiibo.head + amiibo.tail }}">
                    <button>Voir</button>
                  </router-link>
                </td>
              </tr>
            </table>
          </p>
          <div style="display: flex">
            <button @click="loadMoreAmiibos">Charger plus</button>
            <button style="margin-inline: 20px;" @click="fetchAmiiboList">Reset</button>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
