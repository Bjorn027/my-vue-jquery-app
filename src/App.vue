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
export default {
  components: { Login, Notes, Groups },
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>