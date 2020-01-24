<template>
  <div>
    <input v-model="username" />
    <input v-model="password" type="password" />
    <button @click="login">Login</button>
    <div>{{ res }}</div>
    <button @click="addFakeNote">Add Fake Note</button>
    <div v-for="(note, i) in notes" :key="i">
      <h3>{{ note.text }}</h3>
      <h5>{{ note.author }}</h5>
    </div>
  </div>
</template>

<script>
import Jquery from "jquery";

const $ = Jquery;
const server = "https://supernotes.duckdns.org";

export default {
  data: () => ({
    username: "",
    password: "",
    res: "",
    notes: []
  }),
  methods: {
    login() {
      let dataToSend = {
        username: this.username,
        password: this.password
      };
      $.post(server + "/login", dataToSend, res => {
        this.res = JSON.stringify(res);
        this.showAlert();
      });
    },
    showAlert() {
      alert("So shown!");
    },
    addFakeNote() {
      this.notes.push({
        text: "Hello world",
        author: "Jimothy"
      });
    }
  }
};
</script>

<style scoped>
div {
  border: 2px solid grey;
  border-radius: 10px;
  padding: 10px;
}
</style>