import Vue from "vue";
import App from "./App.vue";
import router from "./routes/index";
import * as firebase from "firebase";
import store from "./store";

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);

import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const configOptions = {
  apiKey: "AIzaSyBYZ4bAY90ZkyXyvqlBomiDtUDrhYlSZzo",
  authDomain: "tic-project-b2ca4.firebaseapp.com",
  databaseURL: "https://tic-project-b2ca4.firebaseio.com",
  projectId: "tic-project-b2ca4",
  storageBucket: "tic-project-b2ca4.appspot.com",
  messagingSenderId: "568030064709",
  appId: "1:568030064709:web:1df21b42ce1b763363b32c",
  measurementId: "G-J831ZP0GF2"
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");