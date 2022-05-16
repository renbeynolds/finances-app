export const apiGet = async <ResponseType>(
  endpoint: string
): Promise<ResponseType> => {
  return fetch(endpoint).then((response) => response.json());
};

export const apiPost = async <BodyType, ResponseType>(
  endpoint: string,
  body: BodyType
): Promise<ResponseType> => {
  return fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};

export const apiPut = async <BodyType, ResponseType>(
  endpoint: string,
  body: BodyType
): Promise<ResponseType> => {
  return fetch(endpoint, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};

export const apiFormPost = async <ResponseType>(
  endpoint: string,
  body: FormData
): Promise<ResponseType> => {
  return fetch(endpoint, {
    method: 'POST',
    body: body,
  }).then((response) => response.json());
};
