import AsyncStorage from '@react-native-async-storage/async-storage';
import {appConstant} from '../constant';
const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  console.log('Done.');
};
const getAccessToken = async () => {
  const temp = await AsyncStorage.getItem(appConstant.ACCESS_TOKEN);

  let token;
  if (temp) {
    token = temp;
    return token;
  } else {
  }
  return token;
};

const setAccessToken = async data => {
  await AsyncStorage.setItem(appConstant.ACCESS_TOKEN, data)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};


const getUser = async () => {
  const temp = await AsyncStorage.getItem(appConstant.USER);

  let user;
  if (temp) {
    user = JSON.parse(temp);
    return user;
  } else {
  }
  return user;
};

const setUser = async data => {
  console.log(" response login--------->", data);
  
  await AsyncStorage.setItem(appConstant.USER, JSON.stringify(data))
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

export default {
  getAccessToken,
  setAccessToken,
  
  getUser,
  setUser,
  clearAll
  
};
