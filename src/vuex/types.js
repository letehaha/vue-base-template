const mutations = {
  SET_HEADER_BACK_HANDLER: 'SET_HEADER_BACK_HANDLER',
  RESET_HEADER_BACK_HANDLER: 'RESET_HEADER_BACK_HANDLER',
};
const actions = {};
const getters = {
  GET_STOCKS_DATA: 'GET_STOCKS_DATA',
  GET_HEADER_BACK_HANDLER: 'GET_HEADER_BACK_HANDLER',
};

export const vuexTypes = Object.freeze({
  ...mutations,
  ...actions,
  ...getters,
});
