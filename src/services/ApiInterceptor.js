import axios from "axios";
//import { BASE_URL } from "../config/BaseURL";
// import NavigationService from "../utils/NavigationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiConstant } from "@/constant";


function makeFormDataPostHeaders() {
  console.warn("i am in makeFormDataPostHeaders==>");
  let headerObj = {};
  const accessToken = global.access_token;
  headerObj = {
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYmI4MTkzMmM5OWU0NGEwZGQzZTU5YTEwMGQ0NjY4OTM2ZGNiMmU5ZWRmMzc2M2ExNTVmODE4YWNiM2RkNjhjNjk3YTVkYmNkNzZmYjdmZWUiLCJpYXQiOjE2NjE0Mjk5MjcuNzkwNjY4OTY0Mzg1OTg2MzI4MTI1LCJuYmYiOjE2NjE0Mjk5MjcuNzkwNjcxMTEwMTUzMTk4MjQyMTg3NSwiZXhwIjoxNjkyOTY1OTI3Ljc4NTkxMjk5MDU3MDA2ODM1OTM3NSwic3ViIjoiNzkiLCJzY29wZXMiOltdfQ.C1j7sltM13owWzMH4cFXSKPmYi7H-9aO7-nNgKqIHQGyGB3C39j8Q2e0WcsUcDNMoi_NMsQpQTwZ0CzHi-OkibOWO_dTTPI6FVCUhIyqJJybyLPOKpm4QX3m6yJzKaQhOzi6sD0l0qFtryZ4ESH_toRdEemU7yv3TJUsyeclaUQK7CbaVGBt-j0eWjzyCWaoD-6YIfzuSh13KqYYYdtoONFAzzdIj3cQ-C3K2G5DkEYzCdt3MKbgDP_4EKYYEEC9_TWsw1dk5mH17N0MlweKYBO6-q7JXQjZw3IM_pnavgFY4PbVK2S1fuqqVxJv_opKoMpWNMDK6_wVr9USseKnDXeO_YvuG-qIjtW1p14TrKDqBnHjaMgGuJPm9kmjjv20Q8OakwhxAQ8MLJfjYVaiFk8xElwMZM3c6JhobZuyEg_at8y085z62Bw-aId8gn5I701yQ5MidBEDDnoPghgqiaFSxfiMqGtTZ_i9BUzf1bMgtSss9F9HHLS-NsYRcljTM0BPkvl48H4hvRq_wNInFd2-RIuOrfZOo9XfoVkQshoeUEVMfIh1WxYkLroGC-aod7toU8Enlf0ejIVv75TBNlAQi6S-DVIlv0gKAA2J-FHxOAmT1LsJ4CZzdJYZAnjX9S-j5Yoo6zUFM66rj43AVN4Q7SH4KsKCvnGdATQrKq4`,
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    mimeType: "multipart/form-data",
  };
  return headerObj;
}

function makeGetHeaders() {
  let headerObj = {};
  const accessToken = global.access_token;
  headerObj = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "text/plain",
    mimeType: "text/plain",
    Accept: "application/json",
  };
  return headerObj;
}

function makeRowDataHeaders() {
  let headerObj = {};
  const accessToken = global.access_token;
  headerObj = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  return headerObj;
}

function makeAuthPostHeaders() {
  let headerObj = {};
  headerObj = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  return headerObj;
}

function makeURLencodedPostHeaders() {
  let headerObj = {};
  const accessToken = global.access_token;
  headerObj = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  return headerObj;
}

const axiosApi = axios.create({
  withCredentials: true,
  baseURL:`${apiConstant.BASE_URL}`,
});

axiosApi.interceptors.request.use((request) => {
  if (request.method === "get") {
    request.headers = makeGetHeaders();
  } else {
      request.headers = makeFormDataPostHeaders();
  }
  console.log("<~~~~~~~~~~~ REQUEST:::=>" + JSON.stringify(request));
  return request;
});

const checkRespAndRedirect = (response) => {
  const { data } = response;
  console.log("i am in checkRespAndRedirect =>", JSON.stringify(data));
};

axiosApi.interceptors.response.use(
  (response) => {
    checkRespAndRedirect(response);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      return Promise.reject(error.response);
    } else if (error.response.status === 402) {
      alert( error.response.data.error)
     
      AsyncStorage.clear();
    //  NavigationService.reset("Login");
    } else if (error.response.status === 500) {
      alert("Internal server error")
     
    }

    console.warn("i am in axios get error", error);
    console.warn("error.response.data", error.response.data);
    console.warn("error.response.headers", error.response.headers);
    console.warn("error.response.status", error.response.status);
    console.warn("error.request", error.request);
    console.warn("ErrorErrormsg", error.message);
    console.warn("error.config", error.config);
    return Promise.reject(error.response);
  }
);

export default axiosApi;
