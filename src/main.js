import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import vuetify from './plugins/vuetify'
import { routes } from './routes';
import store from './store';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyBx0impHPxWSSlewS5Ubhc5S20OvVpeqC8",
  authDomain: "cdhvue.firebaseapp.com",
  projectId: "cdhvue",
  storageBucket: "cdhvue.appspot.com",
  messagingSenderId: "805611795420",
  appId: "1:805611795420:web:574596d059ce0bccd01519",
  measurementId: "G-6HX8Q2JX7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

Vue.use(VueRouter);
const router = new VueRouter({
  routes: routes,
});

new Vue({
  router: router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
