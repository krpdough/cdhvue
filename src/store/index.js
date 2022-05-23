import Vue from 'vue';
import Vuex from 'vuex';
import cards from './modules/cards';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    cards,
  }
});