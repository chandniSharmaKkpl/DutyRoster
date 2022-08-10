import React, { useState, useCallback, useEffect } from "react";
import { View, BackHandler, FlatList, Text, Pressable } from "react-native";
import stylesCommon from "../../common/commonStyle";
import styles from "./style";
import { AppText } from "@/components/AppText";
import { useNavigation, useRoute } from "@react-navigation/core";
import { CustomButton } from "@/components/CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { alertMsgConstant, appColor, appConstant } from "@/constant";
import { AlertView, CommonHeader } from "@/components";
import { Images } from "@/constant/svgImgConst";
import { navigationRef } from "@/navigators/utils";
import style from "./style";
import { color } from "react-native-reanimated";

const ProfileSetting = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [isAlertShow, setIsAlertShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  console.log("isAlertShow ==>", selectedItem);
  const handleBackButtonClick = () => {
    moveBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  const moveBack = () => {
    props.navigation.goBack();
  };

  const editProfile = () => {
    navigationRef.navigate(appConstant.EDIT_PROFILE);
  };

  const onLogout = () => {
    navigationRef.navigate(appConstant.LOGIN);
  };

  const DATA = [
    {
      id: 1,
      title: "Edit Profile",
      userIcon: (props) => <Images.IMAGE_USER_SVG {...props} />,
      rightArrow: (props) => <Images.IMAGE_RIGHT_ARROW_SVG {...props} />,
      func: editProfile,
    },
    {
      id: 2,
      title: "Logout",
      userIcon: (props) => <Images.IMAGE_LOGOUT_SVG {...props} />,
      rightArrow: (props) => <Images.IMAGE_RIGHT_ARROW_SVG {...props} />,
      func: onLogout,
    },
  ];

  const Item = ({ title, userIcon, rightArrow, func, id }) => (
    <Pressable
      onPress={() => {
        func();
        setSelectedItem(id);
      }}
    >
      <View style={selectedItem === id ? styles.activeRow : styles.row}>
        <View style={styles.iconTextContaioner}>
          <View style={styles.userIcon}>
            {userIcon({
              style: selectedItem === id ? styles.textRed : styles.textBlack,
            })}
          </View>
          <Text
            style={[
              styles.title,
              selectedItem === id ? styles.textRed : styles.textBlack,
            ]}
          >
            {title}
          </Text>
        </View>
        <View>
          {rightArrow({
            style: selectedItem === id ? styles.textRed : styles.textBlack,
          })}
        </View>
      </View>
    </Pressable>
  );

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      userIcon={item.userIcon}
      rightArrow={item.rightArrow}
      func={item.func}
      id={item.id}
    />
  );

  return (
    <>
      <CommonHeader screenName={route?.name} />
      <View style={[stylesCommon.container, styles.container]}>
        <View style={styles.viewTopTitle}>
          <AppText
            style={styles.txtProfileSetting}
            text={appConstant.PROFILE_SETTINGS}
          ></AppText>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
};

export default ProfileSetting;
