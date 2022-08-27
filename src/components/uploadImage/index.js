import React,{useEffect, useState} from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  Platform,
  TouchableWithoutFeedback,
  Linking,
  Alert,
} from "react-native";
import { alertMsgConstant, imageConstant } from "@/constant";
import Modal from "react-native-modal";
import ImagePicker from "react-native-image-crop-picker";
import AuthContext from "@/context/AuthContext";
import styles from "./style";

const { height, width } = Dimensions.get("screen");

const UploadImage = (props) => {
  const [options, setoptions] = useState([
    {
      image: imageConstant.IMAGE_SWIPE_ICON,
      title: alertMsgConstant.CAPTURE_IMAGE,
      id: 0,
    },
    {
      image: imageConstant.IMAGE_SWIPE_ICON,
      title: alertMsgConstant.SELECT_PHOTO_FROM_LIBRARY,
      id: 1,
    },
  ]);

  const [profile_imagePath, setProfile_imagePath] = useState(null);
  const { onOpenMediaPicker, setOnOpenMediaPicker, setProfiilePath, setImageSource } = props;
  const { user } = React.useContext(AuthContext);
  const [meadiaUploadList, setMeadiaUploadList] = useState({
    filePath: "",
    fileDisplay: "",
    fileName: "",
    type: "",
    mediaType: "",
  });

  React.useEffect(() => {}, [meadiaUploadList]);
  const closemediaPicker = () => {
    setOnOpenMediaPicker(false);
  };

  const renderOptionsview = (item, index) => {
    return (
      <View style={{ marginTop: height * 0.002 }}>
        <TouchableWithoutFeedback onPress={() => onselectOptions(item)}>
          <View style={styles.viewPopupStyle}>
            {item.title == alertMsgConstant.CAPTURE_IMAGE ? (
              <Image
                resizeMethod="resize"
                style={styles.imagePopupStyle}
                source={imageConstant.IMAGE_CAMERAIMAGE_ICON}
              ></Image>
            ) : (
              <Image
                resizeMethod="resize"
                style={styles.imagePopupStyle}
                source={imageConstant.IMAGE_GALLERY_ICON}
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
        setProfiilePath(response);
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
        if (e.message !== alertMsgConstant.CANCELLED_IMAGE_SELECTION) {
          if (Platform.OS === "ios") {
            Alert.alert("Dodee App", e.message, [
              { text: alertMsgConstant.OK , onPress: () => Linking.openSettings() },
              { text: alertMsgConstant.CANCEL , onPress: () => console.log("Cancel Pressed") },
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
        console.log("choose Media ====>", response);
        setProfiilePath(response);
        setProfile_imagePath(
          Platform.OS == "ios"
            ? response.path.replace("file://", "")
            : response.path
        );
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
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    if(profile_imagePath){
      setImageSource(profile_imagePath)
    }
  },[profile_imagePath])

  const onselectOptions = (item) => {
    closemediaPicker(false);
    setTimeout(() => {
      if (item.title == alertMsgConstant.CAPTURE_IMAGE) {
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
