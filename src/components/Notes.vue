<template>
  <v-card class="mx-auto" height="40" max-width="365" outlined>
    <v-btn color="#800000" @click="getNotes()">Notes</v-btn>
    <v-btn color="#800000" @click="createNote()">Create Note</v-btn>
    <v-btn color="#800000" @click="removeNote()">Remove Note</v-btn>
  </v-card>
</template>

<script>
import Jquery from "jquery";

const $ = Jquery;
const server = "https://supernotes.duckdns.org";
export default {
}
</script>

<style>
</style>