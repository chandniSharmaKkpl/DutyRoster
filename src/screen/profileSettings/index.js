import React, { useState, useCallback, useEffect } from "react";
import { View, BackHandler, FlatList, Text, Pressable } from "react-native";
import stylesCommon from "../../common/commonStyle";
import styles from "./style";
import { AppText } from "@/components/AppText";
import { useNavigation, useRoute } from "@react-navigation/core";
import { appConstant } from "@/constant";
import { CommonHeader } from "@/components";
import { Images } from "@/constant/svgImgConst";
import { navigationRef } from "@/navigators/utils";
import { connect } from "react-redux";
import { userLogoutAction } from "../login/redux/Login.action";

const ProfileSetting = (props) => {
  const { userLogoutActionCall } = props;

  const navigation = useNavigation();
  const route = useRoute();

  const [selectedItem, setSelectedItem] = useState(null);

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

  const onGoBack = () => {
    moveBack()
  };

  const moveBack = () => {
    props.navigation.goBack();
  };

  const editProfile = () => {
    navigationRef.navigate(appConstant.EDIT_PROFILE);
  };

  const onLogout = () => {
    userLogoutActionCall();
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
      <CommonHeader screenName={route?.name} onGoBack={onGoBack} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    userLogoutActionCall: () => dispatch(userLogoutAction()),
  };
};
export default connect(null, mapDispatchToProps)(ProfileSetting);
