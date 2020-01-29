<template>
  <v-card class="mx-auto" height="800" max-width="800" outlined>
    <v-btn color="#800000" @click="getGroups()">Groups</v-btn>
    <v-btn color="#800000" @click="createGroup()">Create Group</v-btn>
    <input v-model="createGroupText" placeholder="name" />
    <v-btn color="#800000" @click="removeGroup()">Remove Group</v-btn>
  </v-card>
</template>

<script>
import Jquery from "jquery";

const $ = Jquery;
const server = "https://supernotes.duckdns.org";
export default {
  methods: {
    removeGroup(groupId) {
      $.post(server + "/groups/remove", { groupId }, res => {
        if (res.success) {
          this.getGroups();
        } else {
          this.res = res;
        }
      });
    },
    getGroups() {
      $.get(server + "/groups", res => {
        if (res.success) {
          this.groups = res.groups;
        } else {
          this.res = res;
        }
      });
    },
    createGroup() {
      $.post(
        server + "/groups/create",
        {
          text: this.createGroupText
        },
        res => {
          if (res.success) {
            this.groups = res.groups;
            this.createGroupText = "";
          } else {
            this.res = res;
          }
        }
      );
    }
  }
};
</script>

<style>
</style>