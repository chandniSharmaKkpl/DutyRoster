import React from "react";
import {
  View,
  BackHandler,
  Pressable,
  Image,
  Text,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Platform,
  TouchableWithoutFeedback,
  Linking,
  Alert,
} from "react-native";
import { alertMsgConstant } from "@/constant";
import Modal from "react-native-modal";
import ImagePicker from "react-native-image-crop-picker";
import AuthContext from "@/context/AuthContext";
import styles from "./style";

const { height, width } = Dimensions.get("screen");

const UploadImage = (props) => {
  const { onOpenMediaPicker, setOnOpenMediaPicker, setProfiilePath } = props;
  const { user } = React.useContext(AuthContext);
  const [meadiaUploadList, setMeadiaUploadList] = React.useState({
    filePath: "",
    fileDisplay: "",
    fileName: "",
    type: "",
    mediaType: "",
  });

  const [options, setoptions] = React.useState([
    {
      image: require("../../assets/images/EditProfile/swipe.png"),
      title: alertMsgConstant.CAPTURE_IMAGE,
      id: 0,
    },
    {
      image: require("../../assets/images/EditProfile/swipe.png"),

      title: alertMsgConstant.SELECT_PHOTO_FROM_LIBRARY,
      id: 1,
    },
  ]);

  const [profile_imagePath, setProfile_imagePath] = React.useState(
    user && user.user_detail && user.user_detail.profile_image
      ? user.user_detail.profile_image
      : ""
  );
  console.log("profile_imagePath ===>", profile_imagePath);


  const closemediaPicker = () => {
    setOnOpenMediaPicker(false);
  };

  const renderOptionsview = (item, index) => {
    return (
      <View style={{ marginTop: height * 0.002 }}>
        <TouchableWithoutFeedback onPress={() => onselectOptions(item)}>
          <View style={styles.viewPopupStyle}>
            {item.title == "Take Photo" ? (
              <Image
                resizeMethod="resize"
                style={styles.imagePopupStyle}
                source={require("../../assets/images/EditProfile/cameraImage.png")}
              ></Image>
            ) : (
              <Image
                resizeMethod="resize"
                style={styles.imagePopupStyle}
                source={require("../../assets/images/EditProfile/gallery.png")}
              ></Image>
            )}

            <Text style={styles.textStylePopup}>{item.title}</Text>
          </View>
        </TouchableWithoutFeedback>
        {index < 1 ? <View style={styles.lineStyle1}></View> : null}
      </View>
    );
  };

  const captureImage = () => {
    ImagePicker.openCamera({
      cropping: true,
      mediaType: "photo",
      width: 500,
      height: 500,
      forceJpg: true,
      cropperCircleOverlay: true,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      freeStyleCropEnabled: true,
    })
      .then((response) => {
        console.log("captureImage ::::", response);
        setProfiilePath(response)
        setMeadiaUploadList({
          ...meadiaUploadList,
          filePath:
            Platform.OS == "ios"
              ? response.path.replace("file://", "")
              : response.path,
          fileDisplay:
            Platform.OS == "ios"
              ? response.path.replace("file://", "")
              : response.path,
          fileName: Math.floor(new Date().getTime() / 1000) + ".png",
          type: response.mime,
          mediaType: "image",
        });
        setProfile_imagePath(
          Platform.OS == "ios"
            ? response.path.replace("file://", "")
            : response.path
        );
        closemediaPicker(false);
      })
      .catch((e) => {
        if (e.message !== "User cancelled image selection") {
          if (Platform.OS === "ios") {
            Alert.alert("Dodee App", e.message, [
              { text: "OK", onPress: () => Linking.openSettings() },
              { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
            ]);
          } else {
            console.log(e.message ? "ERROR" + e.message : "ERROR" + e);
          }
        } else {
          console.log(e.message);
        }
      });
  };

  const chooseMedia = () => {
    ImagePicker.openPicker({
      cropping: true,
      mediaType: "photo",
      width: 500,
      height: 500,
      forceJpg: true,
      cropperCircleOverlay: true,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      freeStyleCropEnabled: true,
    })
      .then((response) => {
        console.log("chooseMedia ====>", response);
        setProfiilePath(response)
        setMeadiaUploadList({
          ...meadiaUploadList,
          filePath:
            Platform.OS == "ios"
              ? response.path.replace("file://", "")
              : response.path,
          fileDisplay:
            Platform.OS == "ios"
              ? response.path.replace("file://", "")
              : response.path,
          fileName: Math.floor(new Date().getTime() / 1000) + ".png",
          type: response.mime,
          mediaType: "image",
        });
        setProfile_imagePath(
          Platform.OS == "ios"
            ? response.path.replace("file://", "")
            : response.path
        );
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const onselectOptions = (item) => {
    closemediaPicker(false);
    setTimeout(() => {
      if (item.title == "Take Photo") {
        captureImage();
      } else if (item.title == alertMsgConstant.SELECT_PHOTO_FROM_LIBRARY) {
        chooseMedia();
      }
    }, 1000);
  };

  return onOpenMediaPicker == true ? (
    <Modal
      backdropColor="rgba(52, 52, 52, 0.8)"
      backdropOpacity={1}
      animationType="slide"
      transparent={true}
      isVisible={onOpenMediaPicker}
      onRequestClose={() => {
        closemediaPicker(false);
      }}
      onBackdropPress={() => {
        closemediaPicker(false);
      }}
    >
      <View style={styles.modalmediaopen}>
        <View style={styles.titleviewstyle}>
          <Text style={[styles.choosefilestyle, { fontWeight: "bold" }]}>
            {alertMsgConstant.CHOOSE_FILE_TO_UPLOAD}
          </Text>
          <View style={styles.lineStyle}></View>
          <View
            style={{
              height: width * 0.25,
            }}
          >
            <FlatList
              style={[styles.renderMimetypeImagemainView]}
              data={options}
              renderItem={({ item, index }) => renderOptionsview(item, index)}
              bounces={false}
              showsVerticalScrollIndicator={false}
              listKey={(item, index) => "D" + index.toString()}
              keyExtractor={(item, index) => "D" + index.toString()}
            />
          </View>
        </View>
      </View>
    </Modal>
  ) : null;
};

export default UploadImage;
