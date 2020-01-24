<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-text>
      <div>Word of the Day</div>
      <p class="display-1 text--primary">be•nev•o•lent</p>
      <p>adjective</p>
      <div class="text--primary">{{ text }}</div>
      <div class="text--primary">Pretty is {{ pretty }}</div>
      <div v-if="pretty">I'm so pretty</div>
      <button @click="pretty = !pretty">Toggle Pretty</button>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="deep-purple accent-4">Learn More</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["text"],
  data: () => ({
    pretty: true
  }),
  methods: {}
};
</script>

<style>
</style>