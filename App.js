import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { StoreRoot, persistor } from "./src/store";
import ApplicationNavigator from "@/navigators/Application";
import { Text } from "react-native";
import addAuthTokenInterceptor from "@/api/addAuthTokenInterceptor";
import Toast, { ToastProvider } from "react-native-toast-notifications";

addAuthTokenInterceptor(StoreRoot); // set accessToken all api

console.disableYellowBox = true;
const App = () => {
  return (
    <ToastProvider>
      <Provider store={StoreRoot}>
        <PersistGate loading={<Text></Text>} persistor={persistor}>
          <ApplicationNavigator />
        </PersistGate>
      </Provider>
      <Toast ref={(ref) => (global.toast = ref)} />
    </ToastProvider>
  );
};

export default App;
