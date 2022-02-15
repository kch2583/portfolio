import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  vuetify,
  router,
  axios,
}).$mount("#app");
