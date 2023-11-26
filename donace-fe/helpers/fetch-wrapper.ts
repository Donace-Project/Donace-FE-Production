import { authHelper } from "./authHelper";

// TODO: Move config này ra setting
const baseUrl = "http://35.198.246.148:8082/";

export const fetchWrapper = {
  get,
  post,
  postFile,
  put,
  delete: _delete,
};

function fetchRelative(url: string, option: RequestInit) {
  return fetch(new URL(url, baseUrl), option);
}

async function get(url: string) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  } as RequestInit;

  const response = await fetchRelative(url, requestOptions);
  return handleResponse(response);
}

async function post(url: string, body: any) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    credentials: "include",
    body: JSON.stringify(body),
  } as RequestInit;

  const response = await fetchRelative(url, requestOptions);
  return handleResponse(response);
}

async function postFile(url: string, body: any) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader() },
    credentials: "include",
    body: body,
  } as RequestInit;

  const response = await fetchRelative(url, requestOptions);
  return await response.text();;
}

async function put(url: string, body: any) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(body),
  } as RequestInit;
  const response = await fetchRelative(url, requestOptions);
  return handleResponse(response);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url: string) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  } as RequestInit;
  const response = await fetchRelative(url, requestOptions);
  return handleResponse(response);
}

// helper functions

function authHeader() {
  const token = authHelper.getToken();
  return { Authorization: `Bearer ${token}` };
}

async function handleResponse(response: Response) {
  const text = await response.text();
  const data = text && JSON.parse(text);
  if (!response.ok) {
    if ([401, 403].includes(response.status)) {
    }

    return Promise.reject(data);
  }
  return data;
}
