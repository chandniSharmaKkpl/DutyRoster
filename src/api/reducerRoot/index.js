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
import QRCode_ResponseReducer from "@/screen/qrCode/redux/QRCode.reducer.js";
import ProfileReducer from "@/screen/editProfile/redux/Profile.reducer";
import RosterReducer from "@/screen/roster/redux/Roster.reducer";
import AvailabilityReducer from "@/screen/availability/redux/Availability.reducer";
import TimeSheetReducer from "@/screen/timeSheet/redux/TimeSheet.reducer";
import SplashScreenReducer from "@/screen/splashScreen/redux/SplashScreen.reducer";

const encryptor = encryptTransform({
  secretKey: "dodee_app",
  onError: function (error) {
    console.error("encryptTransform", error);
  },
});
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["LoginReducer"],
};
const ReducerRoot = combineReducers({
  GlobalReducer,
  LoginReducer,
  SignupReducer,
  Forgot_PasswordReducer,
  Reset_PasswordReducer,
  QRCode_ResponseReducer,
  ProfileReducer,
  RosterReducer,
  AvailabilityReducer,
  TimeSheetReducer,
  SplashScreenReducer
});

export default persistReducer(persistConfig, ReducerRoot);
