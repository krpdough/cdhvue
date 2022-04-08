import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import { createProvider } from './vue-apollo'
import { routes } from './routes';

Vue.config.productionTip = false;

Vue.use(VueRouter);
const router = new VueRouter({
  routes: routes,
});


new Vue({
  apolloProvider: createProvider(),
  router: router,
  render: h => h(App)
}).$mount('#app')
