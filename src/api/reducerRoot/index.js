import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import CryptoJS from "crypto-js";

import GlobalReducer from "./global.reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Reducer
import LoginReducer from "@/screen/login/redux/Login.reducer";

const encryptor = encryptTransform({
  secretKey: "dodee_app",
  onError: function (error) {
    console.error("encryptTransform", error);
  },
});
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
};
const ReducerRoot = combineReducers({
  GlobalReducer,
  LoginReducer,
});

export default persistReducer(persistConfig, ReducerRoot);
