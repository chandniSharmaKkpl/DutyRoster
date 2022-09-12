import { AlertView } from "@/components";
import { alertMsgConstant } from "@/constant";
import { Alert, AppState, Linking } from "react-native";

// export const CurrentAppState = () => {
//     const appState = useRef(AppState.currentState);
//     const [appStateVisible, setAppStateVisible] = useState(appState.current);

//     useEffect(() => {
//         const subscription = AppState.addEventListener("change", nextAppState => {
//           if (
//             appState.current.match(/inactive|background/) &&
//             nextAppState === "active"
//           ) {
//             console.log("App has come to the foreground!");
//           }

//           appState.current = nextAppState;
//           setAppStateVisible(appState.current);
//           console.log("AppState", appState.current);
//         });

//         return () => {
//           subscription.remove();
//         };
//       }, []);
// }

export const PermissionAlertModel = (message) => {


  console.log("permissionAlertIOS", message);
  Alert.alert(
    alertMsgConstant.ALERT,
    message,
    [{ text: alertMsgConstant.OK, onPress: () => Linking.openSettings() }],
    {
      // onDismiss: () => {}
      cancelable: true
    }
  );
//   Alert.addListener("dismiss", () => {
//     appStateVisible == "background";
//   });
};
