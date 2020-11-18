import _ from 'lodash';

export const selectTransactionsArray = (state) => {
  return _.reverse(_.sortBy(Object.values(state.transactions), ['id']));
};