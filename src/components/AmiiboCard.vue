<script setup>

const props = defineProps({
  amiibo: {
    type: Object,
    required: true
  },
})
</script>

<template>
  <div class="col-4 col-12-medium">
    <section class="middle">
      <img alt="" :src="amiibo.image" />
      <header>
        <h2>{{amiibo.character}}</h2>
      </header>
      <p>{{amiibo.gameSeries}}</p>
    </section>
  </div>
</template>
