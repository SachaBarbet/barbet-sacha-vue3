<script setup>
import {onMounted} from 'vue'
import {useAmiiboDetailsStore} from '@/stores/amiibo.js'
import {useRoute} from 'vue-router';
import {storeToRefs} from "pinia";
const $route = useRoute();

const store = useAmiiboDetailsStore();
const {fetchAmiiboDetails} = store;

const {error, loading, amiiboDetails} = storeToRefs(store);

console.log(amiiboDetails);

onMounted(() => {
  fetchAmiiboDetails($route.params.elementId);
});
</script>

<template>
  <section id="main">
    <div class="container">
      <div v-if="loading">Chargement...</div>
      <div v-if="error">{{error.message}}</div>
      <div class="row" v-if="amiiboDetails.amiibo">
        <div class="col-4 col-12-medium">

          <!-- Sidebar -->
          <section class="box">
            <header>
              <h3>Infos</h3>
            </header>
            <p> amiiboSeries: <b>{{ amiiboDetails.amiibo.amiiboSeries }}</b> <br/>
              character: {{ amiiboDetails.amiibo.character }}<br/>
              gameSeries: {{ amiiboDetails.amiibo.gameSeries }}<br/>
              type: {{ amiiboDetails.amiibo.type }}
            </p>

          </section>
          <section class="box">
            <header>
              <h3>Dates sorties</h3>
            </header>

            <ul class="divided">
              <li>au: {{ amiiboDetails.amiibo.release.au }}</li>
              <li>au: {{ amiiboDetails.amiibo.release.au }}</li>
              <li>au: {{ amiiboDetails.amiibo.release.jp }}</li>
              <li>au: {{ amiiboDetails.amiibo.release.na }}</li>
            </ul>

          </section>

        </div>
        <div class="col-8 col-12-medium imp-medium">

          <!-- Content -->
          <article class="box post">
            <a href="#" class="featured"><img
                :src="amiiboDetails.amiibo.image"
                alt=""/></a>
            <header>
              <h2>{{ amiiboDetails.amiibo.name}}</h2>
              <p>{{ amiiboDetails.amiibo.type }}</p>
            </header>
          </article>

        </div>
      </div>
    </div>
  </section>
</template>
