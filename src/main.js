import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import vuetify from './plugins/vuetify'
import { routes } from './routes';
import store from './store';

Vue.config.productionTip = false;

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
