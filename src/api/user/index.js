import client from "@/api/client";
import { Config } from "@/config";
import { apiConstant } from "@/constant";

var config = {
  headers: {},
};

export const user = (params) =>
  client.post(apiConstant.VIEW_PROFILE, params, config);

export const updateProfile = ({ token, ...params }) => {
  config.headers["Authorization"] = `Bearer ${token}`;
  var requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: params,
    // redirect: "follow",
  };
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    Object.keys(params).map((key) => {
      formdata.append(key, params[key]);
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(apiConstant.BASE_URL + apiConstant.EDIT_PROFILE, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
        console.log("error", error);
      });
  });
};

export const getAvailbility = ({ token, ...params }) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
   myHeaders.append("Content-Type", "application/json");

  console.log(" token ---", params);
  
  var raw = JSON.stringify({
    "week_start": params.week_start,
    "week_end": params.week_end
    
  });
  console.log(" params --", params);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    // redirect: "follow",
  };

  fetch(
    "https://2exceltest.com.au:8443/dodee/api/availability/list",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(" get availability response", result))
    .catch((error) => console.log("error", error));
};

export const getAvailbility1 = async (
  url,
  data = {},
  params = {},
  apiPath = null
) => {
  const accessToken = await KeyChain.getAccessToken();
  const config = {
    baseURL: apiConstant.BASE_URL,
    method: "POST",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data,
    params,
  };
  const shouldGoOnline = await goOnline(apiPath);
  if (accessToken && shouldGoOnline) {
    return await getNetworkResponse(config, apiPath);
  } else {
    let response = await Offline.offlineData(config, apiPath);
    if (submitDCRSkipAPIList(apiPath)) {
      let checkOnlineStatus = await checkInternetConnectionForApp();
      let backgroundTaskStatus = await getBackgrounTaskValue();
      if (
        accessToken &&
        checkOnlineStatus &&
        backgroundTaskStatus === Constants.BACKGROUND_TASK.NOT_RUNNING
      ) {
        AsyncStorage.setItem(Constants.SYNC_APIS_IMP_ON_DCR, "true");
        AsyncStorage.setItem(Constants.POST_API_FOR_SYNC, apiPath);
        Sync.SyncService.syncNow();
      }
    }
    return response;
  }
};
