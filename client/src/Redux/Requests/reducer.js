export default (state = {}, action) => {
    const { type } = action;

    const matches = /(.*)\/(pending|fulfilled|rejected)/.exec(type);
    if (!matches) return state;
    const [, requestName, requestState] = matches;

    switch (requestState) {
    case 'pending':
        return {...state, [requestName]: { loading: true, errors: [] }};
    case 'fulfilled':
        let newState = {...state, [requestName]: { loading: false, errors: [] }};
        if (action.payload.pagination) {
            newState[requestName].pagination = {
                current: (action.payload.pagination.offset / action.payload.pagination.limit) + 1,
                pageSize: action.payload.pagination.limit,
                total: action.payload.pagination.total
            }
        }
        return newState;
    case 'rejected':
        return {...state, [requestName]: { loading: false, errors: action.payload }};
    default:
        return state;
    }
};