import { alertMsgConstant } from "@/constant";
import React from "react";
import { Alert, StyleSheet, Text, Pressable, View, FlatList } from "react-native";
import Modal from "react-native-modal";

const UploadImage = () => {
  const [options, setoptions] = React.useState([
    {
    //   image: require("../../assets/Swipe.png"),
      title: alertMsgConstant.CAPTURE_IMAGE,
      id: 0,
    },
    {
    //   image: require("../../assets/Swipe.png"),
      title: alertMsgConstant.SELECT_PHOTO_FROM_LIBRARY,
      id: 1,
    },
  ]);
  const [onopenmediaPicker, setonopenmediaPicker] = React.useState(false);

  const closemediaPicker = () => {
    setonopenmediaPicker(false);
  };

  return onopenmediaPicker == true ? (
    <ReactModal
      backdropColor="rgba(52, 52, 52, 0.8)"
      backdropOpacity={1}
      animationType="slide"
      transparent={true}
      isVisible={onopenmediaPicker}
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
            {AppConstants.constant.CHOOSE_FILE_TO_UPLOAD}
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
    </ReactModal>
  ) : null;
};

export default UploadImage;
