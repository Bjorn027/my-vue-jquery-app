<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped color="#800000">
      <v-list dense>
        <v-list-item link @click="$root.showLogin=true">
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$root.showNotes=true">
          <v-list-item-action>
            <v-icon>mdi-content-paste</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Notes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$root.showGroups=true">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Groups</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="#800000">
      <v-toolbar-title>Super Duper Notes</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <Login v-show="$root.showLogin" />
      <Notes v-show="$root.showNotes" />
      <Groups v-show="$root.showGroups" />
    </v-content>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import Login from "./components/Login";
import Notes from "./components/Notes";
import Groups from "./components/Groups";

import Jquery from "jquery";

const server = "https://supernotes.duckdns.org";

const $ = Jquery;

export default {
  components: { Login, Notes, Groups },
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    getGroups() {
      $.get(server + "/groups", res => {
        if (res.success) {
          this.groups = res.groups;
        } else {
          this.res = res;
        }
      });
    },
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
    },
    removeGroup(groupId) {
      $.post(server + "/groups/remove", { groupId }, res => {
        if (res.success) {
          this.getGroups();
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
  },
  mounted() {
    $.post(server + "/checkLogin", res => {
      if (res.success) {
        this.loginSuccessful(res.username);
      }
    });
  },

  loginSuccessful(username) {
    this.loggedIn = true;
    this.username = username;
    this.getGroups();
    this.getNotes();
  },
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
  },

  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>