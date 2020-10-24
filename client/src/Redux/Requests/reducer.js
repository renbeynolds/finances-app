import { resetRequest } from './actions';

export default (state = {}, action) => {
  const { type, payload } = action;

  if (type === resetRequest.toString()) {
    return { ...state, [payload.name]: { loading: false, errors: [] } };
  }


  const matches = /(.*)\/(pending|fulfilled|rejected)/.exec(type);
  if (!matches) return state;
  const [, requestName, requestState] = matches;

  switch (requestState) {
  case 'pending':
    return { ...state, [requestName]: { loading: true, errors: [] } };
  case 'fulfilled': {
    let newState = { ...state, [requestName]: { loading: false, errors: [] } };
    if (payload.pagination) {
      newState[requestName].pagination = {
        current: (payload.pagination.offset / payload.pagination.limit) + 1,
        pageSize: payload.pagination.limit,
        total: payload.pagination.total
      };
    }
    return newState;
  }
  case 'rejected':
    return { ...state, [requestName]: { loading: false, errors: action.payload } };
  default:
    return state;
  }
};