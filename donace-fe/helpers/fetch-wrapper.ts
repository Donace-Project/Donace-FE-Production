import { authHelper } from "./authHelper";

// TODO: Move config này ra setting
const baseUrl = "http://127.0.0.1:3008/";

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

function fetchRelative(url: string, option: RequestInit) {
  return fetch(new URL(url, baseUrl), option);
}

function get(url: string) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  } as RequestInit;

  return fetchRelative(url, requestOptions).then(handleResponse);
}

function post(url: string, body: any) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    credentials: "include",
    body: JSON.stringify(body),
  } as RequestInit;

  return fetchRelative(url, requestOptions).then(handleResponse);
}

function put(url: string, body: any) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(body),
  } as RequestInit;
  return fetchRelative(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url: string) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  } as RequestInit;
  return fetchRelative(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader() {
  const token = authHelper.getToken();
  return { Authorization: `Bearer ${token}` };
}

function handleResponse(response: Response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if ([401, 403].includes(response.status)) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        // TODO: Handle chuyển trang sang màn login
      }
      
      return Promise.reject(data);
    }

    return data;
  });
}
