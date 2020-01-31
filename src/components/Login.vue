<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="#800000" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="username"
                    @keyup.enter="login"
                    id="username"
                    label="username"
                    type="text"
                  />

                  <v-text-field
                    v-model="password"
                    @keyup.enter="login"
                    id="password"
                    label="password"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="#800000" @click="register()">Register</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-spacer />
                <v-btn color="#800000" @click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Jquery from "jquery";

const $ = Jquery;
const server = "https://supernotes.duckdns.org";

export default {
  data: () => ({
    loggedIn: false,
    username: "",
    password: "",
    res: "",
    createGroupText: "",
    createNoteText: "",
    notes: [],
    groupId: "",
    groups: []
  }),
  methods: {
    login() {
      var data = {
        username: this.username,
        password: this.password
      };
      $.post(server + "/login", data, res => {
        if (res.success) {
          this.loginSuccessful(res.username);
        } else {
          this.res = JSON.stringify(res);
          alert("Login failed");
        }
      });
    },
    loginSuccessful(username) {
      this.loggedIn = true;
      this.username = username;
      this.$root.page = "Groups";
    },
    register() {
      var data = {
        username: this.username,
        password: this.password
      };
      $.post(server + "/register", data, res => {
        if (res.success) {
          this.loginSuccessful(res.username);
        } else {
          this.res = JSON.stringify(res);
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
    }
  },
  mounted() {
    $.post(server + "/checkLogin", res => {
      if (res.success) {
        this.loginSuccessful(res.username);
      }
    });
  },

  props: {
    source: String
  }
};
</script>

<style>
</style>