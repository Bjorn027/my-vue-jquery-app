import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import State from './State';
import './jquery-remote.js';
Vue.config.productionTip = false;

new Vue({
  data: State,
  vuetify,
  render: h => h(App)
}).$mount("#app");
