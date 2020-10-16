const mutations = {
  SET_EXAMPLE: 'SET_EXAMPLE',
};
const actions = {
  FETCH_EXAMPLE: 'FETCH_EXAMPLE',
};
const getters = {
  GET_EXAMPLE: 'GET_EXAMPLE',
};

export const exampleVuexTypes = Object.freeze({
  ...mutations,
  ...actions,
  ...getters,
});
