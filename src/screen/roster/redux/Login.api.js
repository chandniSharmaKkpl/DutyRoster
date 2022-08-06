import { Platform } from 'react-native';
import {apiConstant, appConstant} from '../../constant'
import axios from 'axios'; 

export const acceptApprovalApi = (argumentData) => {

  let approvalId = argumentData.data.approvalId
    let deviceId = argumentData.data.user.deviceId;
    let apiBaseUrl = argumentData.data.user.apiBaseUrl
    let clientToken = argumentData.data.user.clientToken; 

    // console.log(" argument data  : ", argumentData); 

    let instance = axios.create({
      baseURL: apiBaseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${clientToken}`,
        'DeviceId': deviceId,
        'DeviceType': Platform.OS === 'android'? 'ANDROID': 'IOS'
      },
    });
  
    let urlString = apiConstant.APPROVAL_ACCEPT_API;
   // urlString =  urlString.replace(':approvalId', approvalId);  
    // console.log(" url  data  : ", urlString); 

    return instance
      .put(urlString,{'approverId':approvalId})
      
      .then(response =>
        Promise.resolve({
          data: response,
        }).then(response => {
          let response1 = response.data.data; 
          // console.log(" response : ", response1)

          return response1
        }),
      ).catch((err) =>{
        console.log("88 api Erorr: ", err.response)
        return err.response.data
      })
      ;
  };

   // Submit Decline with Reasons calling by reason view 


  export const declineApprovalApi = (argumentData) => {

    let approvalId = argumentData.data.approvalId
      let deviceId = argumentData.data.user.deviceId;
      let apiBaseUrl = argumentData.data.user.apiBaseUrl
      let clientToken = argumentData.data.user.clientToken; 
  
      // console.log(" argument data  : ", argumentData); 
  
      let instance = axios.create({
        baseURL: apiBaseUrl,
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${clientToken}`,
          'DeviceId': deviceId,
          'DeviceType': Platform.OS === 'android'? 'ANDROID': 'IOS'
        },
      });
    
      let urlString = apiConstant.APPROVAL_DECLINE_API;
     // urlString =  urlString.replace(':approvalId', approvalId);  
      // console.log(" url  data  : ", urlString); 
  
      return instance
        .put(urlString,{'approverId':approvalId})
        
        .then(response =>
          Promise.resolve({
            data: response,
          }).then(response => {
            let response1 = response.data.data; 
            // console.log(" response : ", response1)
  
            return response1
          }),
        ).catch((err) =>{
          console.log("88 api Erorr: ", err.response)
          return err.response.data
        })
        ;
    };