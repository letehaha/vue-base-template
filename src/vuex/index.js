import Vue from 'vue';
import Vuex from 'vuex';
import example from './example';

Vue.use(Vuex);

export { vuexTypes } from './types';
export { exampleVuexTypes } from './example';

export default new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    example,
  },
});
