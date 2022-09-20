import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import {
  fontConstant,
  appColor,
  imageConstant,
  appConstant,
} from "../constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import IconMaterial from "react-native-vector-icons/MaterialIcons";
import { AppText } from "./AppText";
import { navigationRef } from "@/navigators/utils";
import { connect } from "react-redux";
import ProgressiveImage from "./ProgressiveImage";

const CommonHeader = (props) => {
  const {
    leftTitle,
    rightTitle,
    leftOnPress,
    rightOnPress,
    iconLeft,
    iconRight,
    screenName,
    onGoBack,
    profileImage,
  } = props;

  const styles = StyleSheet.create({
    viewOuter: {
      backgroundColor: appColor.RED,
      height: hp("7.5%"),
      justifyContent: "center",
    },
    view1: {
      flexDirection: "row",
      display: "flex",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      alignItems: "center",
    },
    viewLeft: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      flex: 1,
    },

    buttonStyle: {
      height: hp("4%"),
      width: wp("20%"),
      backgroundColor: "#242424",
      borderWidth: 1,
      borderRadius: 6,
      alignItems: "center",
      justifyContent: "center",
    },
    txtLeft: {
      color: appColor.WHITE,
      fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
      fontSize: fontConstant.TEXT_H3_SIZE_REGULAR,
    },
    pageName: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flex: 2,
      width: "100%",
    },
    pageNameText: {
      fontFamily: fontConstant.FONT_SEMI_BOLD,
      fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
      color: appColor.WHITE,
      textTransform: "uppercase",
    },
    viewRightProfile: {
      flex: 1,
      // backgroundColor: 'pink',
      height: hp("10%"),
      width: wp("10%"),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    img: {
      height: 40,
      width: 40,
      borderRadius: 20,
    },
    imgEmpty: {
      height: 40,
      width: 40, 
      borderRadius: 20,
    },
    backArrorwContainer : {
      height: 32,
      width: 32,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const onEditProfile = () => {
    navigationRef.navigate(appConstant.PROFILE_SETTINGS);
  };

  const onUnavailablity = () => {
    navigationRef.navigate(appConstant.AVAILABILITY);
  };

  return (
    <View style={styles.viewOuter}>
      <View style={styles.view1}>
        <View style={styles.viewLeft}>
          {screenName === appConstant.ROASTER ? (
            <Pressable style={styles.buttonStyle} onPress={onUnavailablity}>
              <AppText text={appConstant.AVAILABILITY} style={styles.txtLeft} />
            </Pressable>
          ) : (
            <View />
          )}
          {screenName === appConstant.AVAILABILITY ||
          screenName === appConstant.EDIT_PROFILE ||
          screenName === appConstant.QR_CODE ||
          screenName === appConstant.PROFILE_SETTINGS ? (
            <Pressable onPress={onGoBack} style={styles.backArrorwContainer}>
              <Image source={imageConstant.IMAGE_BACK_ARROW_ICON} />
            </Pressable>
          ) : null}
        </View>
        <View style={styles.pageName}>
          <AppText text={screenName} style={styles.pageNameText} />
        </View>
        {screenName === appConstant.ROASTER ||
        screenName === appConstant.TIMESHEETS ? (
          <Pressable style={styles.viewRightProfile} onPress={onEditProfile}>
            <ProgressiveImage
              thumbnailSource={imageConstant.IMAGE_AVTAR_ICON}
              source={{ uri: profileImage }}
              style={!profileImage ? styles.imgEmpty : styles.img}
            />
          </Pressable>
        ) : (
          <View style={styles.viewRightProfile} />
        )}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  profileImage: state.LoginReducer.user?.image,
});
export default connect(mapStateToProps)(CommonHeader);
