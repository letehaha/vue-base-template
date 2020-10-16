import { exampleVuexTypes } from './types';

export { exampleVuexTypes } from './types';

export default {
  state: {
    example: [],
  },
  getters: {
    [exampleVuexTypes.GET_EXAMPLE]: (state) => state.example,
  },
  mutations: {
    [exampleVuexTypes.SET_EXAMPLE](state, example) {
      state.example = example;
    },
  },
  actions: {
    async [exampleVuexTypes.FETCH_EXAMPLE]({ commit }) {
      commit(exampleVuexTypes.SET_EXAMPLE, 'example');
    },
  },
};
