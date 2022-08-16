import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import CryptoJS from "crypto-js";

import GlobalReducer from "./global.reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Reducer
import LoginReducer from "@/screen/login/redux/Login.reducer";
import SignupReducer from "@/screen/signup/redux/Signup.reducer";
import Forgot_PasswordReducer from "@/screen/forgotPassword/redux/Forgot_Password.reducer";
import Reset_PasswordReducer from "@/screen/resetPassword/redux/Reset_Password.reducer";

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
  SignupReducer,
  Forgot_PasswordReducer,
  Reset_PasswordReducer,
});

export default persistReducer(persistConfig, ReducerRoot);
