<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left color="#800000" class="trythis">
      <v-toolbar-title>Super Duper Notes</v-toolbar-title>

      <v-flex align-end>
        <v-list-item class="float-right" link @click="logout(); $root.page='Login'">
          <v-icon>mdi-logout</v-icon>
          <v-list-item-action></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-flex>
    </v-app-bar>

    <v-content>
      <Login v-if="$root.page=='Login'" />
      <Notes v-if="$root.page=='Notes'" />
      <Groups v-if="$root.page=='Groups'" />
    </v-content>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import Login from "./components/Login.vue";

import Groups from "./components/Groups.vue";

import Jquery from "jquery";

const server = "https://supernotes.duckdns.org";

const $ = Jquery;

export default {
  components: { Login, Groups },
  props: {
    source: String
  },
  data: () => ({
    loggedIn: false,
    username: "",
    password: "",
    res: "",
    createGroupText: "",
    createNoteText: "",
    notes: [],
    groupId: "",
    groups: [],
    drawer: null
  }),
  methods: {
    logout() {
      $.post(server + "/logout", res => {
        if (res.success) {
          this.loggedIn = false;
          this.username = "";
          this.createGroupText = "";
          this.createNoteText = "";
          this.notes = [];
          this.groups = [];
          this.groupId = "";
        }
      });
    }
  }
};
</script>
<style>
.v-toolbar__title {
  overflow: inherit;
}
.trythis {
  padding-left: 40px;
}
</style>