import { authHelper } from "./authHelper";

// TODO: Move config này ra setting
const baseUrl = "http://171.245.205.120:8082/";

export const fetchWrapper = {
  get,
  post,
  postWithToken,
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

async function postWithToken(url: string, body: any, token: string) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
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
      throw new Error("Đăng nhập hết hạn, Vui lòng đăng nhập lại")
      
    }
    

    return Promise.reject(data);
  }
  return data;
}


//  ticket request body {
//   "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "eventId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
// }


// async function checkInUserTicket(body: any) {
//   const checkinUrl ="/api/UserTickets/Check-in";
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json", ...authHeader() },
//     credentials: "include",
//     body: JSON.stringify(body),
//   } as RequestInit;

//   const response = await fetchRelative(checkinUrl, requestOptions);
//   return handleResponse(response);
// }