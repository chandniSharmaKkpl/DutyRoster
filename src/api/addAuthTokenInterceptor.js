import client from "./client";

export default function addAuthTokenInterceptor(store) {
  client.interceptors.request.use((req) => {
    const token = store.getState().LoginReducer.accessToken;
    if (!token) return req;
    req.headers.common["Authorization"] = `Bearer ${token}`;
    return req;
  });
}
