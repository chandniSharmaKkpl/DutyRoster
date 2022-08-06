import React, { useState, useCallback, useEffect, useRef } from "react";
import { View, BackHandler, FlatList, Dimensions } from "react-native";
import stylesCommon from "../../common/commonStyle";
import styles from "./style";
import { AppText } from "@/components/AppText";
import { CustomButton } from "@/components/CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PageControlAleppo } from "react-native-chi-page-control";
import { appColor, appConstant } from "@/constant";

const width = Dimensions.get("screen").width;

const TimeSheetScreen = (props) => {
  const [pageCount, setPageCount] = useState(0);
  const [arrayView, setArrayView] = useState([
    "Get honest wine rating on any wine from our community of milions of wine drinkers",
    "Shop the world largest selection directly from your phone",
    "Scan any bottle to learn all about the wine inside",
    "Scan a restaurant wine list and choose your wine with confidence",
  ]);

  const flatListRef = useRef();

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

  const onScroll = (e) => {
    console.log(
      " pageCount ",
      e.nativeEvent.contentOffset.x / ((arrayView.length - 1) * width)
    );

    setPageCount(
      e.nativeEvent.contentOffset.x / ((arrayView.length - 1) * width)
    );
  };

  const changePage = () => {
    console.log(" chagne page ---", pageCount);
    let scrollValue = 0;
    if (pageCount == 0) {
      scrollValue = 0.35;
      setPageCount(0.35);
          flatListRef.current.scrollToOffset({ animated: true, offset: scrollValue });

    } else if (pageCount < 0.66) {
      scrollValue = 0.69
      setPageCount(0.69);
      flatListRef.current.scrollToOffset({ animated: true, offset: scrollValue });

    } else {
      
      setPageCount(1);
      flatListRef.current.scrollToOffset({ animated: true, offset: 1 });

    }

  };
  const renderItem = ({ item }) => {
    return (
      <View style={styles.viewPage}>
        <View style={styles.viewText}>
          <AppText style={styles.txtDesc} text={item}></AppText>
        </View>

        {pageCount < 1 ? (
          <View style={styles.viewNextBtn}>
            <TouchableOpacity onPress={changePage}>
              <AppText style={styles.txtBtnNext} text={"Next"} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.viewCreateAccount}>
            <CustomButton
              title={"Create free account"}
              onPress={goToRegistration}
              styleBtn={styles.btnGetStart}
              styleTxt={styles.txtBtnGetStart}
            />
            <TouchableOpacity onPress={goToApp} style={styles.btnTransparant}>
              <AppText
                style={styles.txtBtnTry}
                text={"Continue without account"}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const goToRegistration = () => {};
  const goToApp = () => {};
  const goToLogin = () => {
    props.navigation.navigate(appConstant.LOGIN)

  };

  return (
    <>
      <View style={[stylesCommon.container, styles.container]}>
        {/* <ImageBackground style={styles.container}> */}
        <View style={styles.viewTop} />

        <View style={styles.viewBottom}>
          <AppText style={styles.txtBtnGetStart} text={"Coming Soon Timesheet"}></AppText>

          <TouchableOpacity onPress={goToLogin} style={styles.btnTransparant}>
            <AppText style={styles.txtBtnTry} text={"Back To Login"} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default TimeSheetScreen;
