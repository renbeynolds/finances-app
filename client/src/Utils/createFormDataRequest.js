export const createFormDataRequest = (routeSuffix, method, body) => {
  let request = {
    method: method,
    url: routeSuffix,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json'
    }
  };
  if (body) { request.data = body; }
  return request;
};

export default createFormDataRequest;
