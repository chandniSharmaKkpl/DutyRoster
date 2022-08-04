import client from "@/api/client";

const config = {
  headers: {},
};
export const login = (params) => client.post(`/login`, params, config);
export const forgotPassword = (params) => client.post(`/forgot-password`,params,config);