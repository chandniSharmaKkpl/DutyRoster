import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { StoreRoot, persistor } from "./src/store";
import ApplicationNavigator from "@/navigators/Application";
import { Text } from "react-native";


const App = () => (
  <Provider store={StoreRoot}>
    <PersistGate loading={<Text></Text>} persistor={persistor}>
      <ApplicationNavigator />
    </PersistGate>
  </Provider>
);


export default App;
