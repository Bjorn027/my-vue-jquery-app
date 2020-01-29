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
  getNotes(groupId) {
    $.get(server + "/notes", { groupId }, res => {
      if (res.success) {
        this.notes = res.notes;
      } else {
        this.res = res;
      }
    });
  },
  createNote() {
    $.post(
      server + "/notes/create",
      {
        text: this.createNoteText,
        groupId: this.groupId
      },
      res => {
        if (res.success) {
          this.notes = res.notes;
          this.createNoteText = "";
        } else {
          this.res = res;
        }
      }
    );
  },
  removeNote(noteId) {
    console.log({ noteId });
    $.post(server + "/notes/remove", { noteId }, res => {
      if (res.success) {
        this.getNotes();
      } else {
        this.res = res;
      }
    });
  }
};
</script>

<style>
</style>