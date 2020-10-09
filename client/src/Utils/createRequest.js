export const createRequest = (routeSuffix, method, body) => {
    let request = {
        method: method,
        url: routeSuffix,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    if (body) { request.data = body; }
    return request;
};

export default createRequest;
