import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  BackHandler,
  Keyboard,
  Text,
  FlatList,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import styles from "../style";
import PropTypes from "prop-types";
import { Images } from "@/constant/svgImgConst";
import { AppText } from "@/components/AppText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { alertMsgConstant, appConstant, imageConstant } from "@/constant";
import { TextInputCustom } from "@/screen/availability/AvailabilityItem/TextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView } from "react-native-gesture-handler";
// import DropDownPicker from "@/utils/"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { SET_DATA_TYPE } from "@/utils/Availablity";
import moment from "moment";
import { Modal } from "react-native";

const AvailabilityItem = (props) => {
  const {
    selectedDistrict,
    data,
    arrayDistricts,

    addNewAvailabilityAction,
    removeAvailabilityAction,
    setDataItemofAvailabilityAction,
  } = props;
  const districtRef = React.useRef();
  const { district_id, inTime, outTime, id } = data;
  const [isShowDistrictList, setIsShowDistrictList] = useState(false);
  const [isTimeInPickerVisible, setTimeInPickerVisibility] = useState(false);
  const [isTimeOutPickerVisible, setTimeOutPickerVisibility] = useState(false);
  const showOutTimePicker = () => {
    if (data.inTime) {
      setTimeOutPickerVisibility(true);
    } else {
      toast.show(alertMsgConstant.PLEASE_SELECT_IN_TIME, {
        type: alertMsgConstant.TOAST_DANGER,
      });
    }
  };
  const showInTimePicker = (index) => {
    setTimeInPickerVisibility(true);
  };
  const hideInTimePicker = () => {
    setTimeInPickerVisibility(false);
  };

  const handleInTimeConfirm = (date) => {
    setDataItemofAvailabilityAction({
      type: SET_DATA_TYPE.inTime,
      data: moment(date).format("hh:mm A"),
      id: id,
    });

    hideInTimePicker();
  };
  const hideOutTimePicker = () => {
    setTimeOutPickerVisibility(false);
  };

  const handleOutTimeConfirm = (date) => {
    if (data.inTime) {
      if (
        Number(moment(data.inTime, "hh:mm A").format("x")) +
          3 * 60 * 60 * 1000 <=
        moment(date).format("x")
      ) {
        setDataItemofAvailabilityAction({
          type: SET_DATA_TYPE.outTime,
          data: moment(date).format("hh:mm A"),
          id: id,
        });
        hideOutTimePicker();
      } else {
        toast.show(alertMsgConstant.MINIMUM_3_HOURS, {
          type: alertMsgConstant.TOAST_DANGER,
        });
        hideOutTimePicker();
      }
    } else {
      // alert("Please");
      toast.show("Please select IN Time", {
        tyee: alertMsgConstant.TOAST_DANGER,
      });
      hideOutTimePicker();
    }
  };
  const renderDistrictList = ({ item }) => {
    return (
      <View>
        <Pressable
          onPress={() => {
            // setSelectedDistrictsAction(item);
            setIsShowDistrictList(false);
            setDataItemofAvailabilityAction({
              type: SET_DATA_TYPE.district_id,
              data: item.district_id,
              id: id,
            });
            // {type, data, id}
          }}
        >
          <Text style={styles.textRow}>{item.district_name}</Text>
        </Pressable>
        <View style={styles.singleLine} />
      </View>
    );
  };
  return (
    <View style={styles.availabilityContainer}>
      <View style={styles.viewTopTitle}>
        {/* Showing plus minus icon besides districts title */}
        <View style={styles.districts}>
          <AppText
            style={styles.txtUnavailablity}
            text={appConstant.DISTRICTS}
          />
          <View style={[styles.iconContainer, { width: wp("15%") }]}>
            {id !== 0 && (
              <Pressable
                style={styles.minusView}
                onPress={() => {
                  removeAvailabilityAction(id);
                }}
              >
                <Images.IMAGE_REMOVE style={styles.plusImage} />
              </Pressable>
            )}
            <Pressable
              style={styles.plusView}
              onPress={() => {
                addNewAvailabilityAction();
              }}
            >
              <Images.IMAGE_PLUS style={styles.plusImage} />
            </Pressable>
          </View>
        </View>

        {/* Showing district list  */}
        <View style={styles.buttonReason}>
          <TouchableOpacity
            onPress={() => {
              // if (districtRef.current) {
              //   districtRef.current.measure((fx, fy, width, height, px, py) => {
              //   });
              // }
              setIsShowDistrictList(!isShowDistrictList);
            }}
            ref={districtRef}
          >
            <View style={[styles.buttonInsideReason]}>
              <Text multiline="true" style={styles.reasonText}>
                {district_id
                  ? arrayDistricts.find(
                      (_el) => _el.district_id === district_id
                    )?.district_name
                  : "Select District"}
              </Text>
              {isShowDistrictList ? (
                <View style={styles.viewArrow}>
                  <Image
                    source={imageConstant.IMAGE_UP_ICON}
                    style={styles.image}
                    resizeMode={"contain"}
                  />
                </View>
              ) : (
                <View style={styles.viewArrow}>
                  <Image
                    source={imageConstant.IMAGE_DOWN_ICON}
                    style={styles.image}
                    resizeMode={"contain"}
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Time */}
      <View style={styles.viewTopTitle}>
        <AppText style={styles.txtUnavailablity} text={appConstant.TIME} />

        <View style={styles.inOutTimeContainer}>
          <View style={[styles.inputTimeText, { marginRight: 10 }]}>
            <TextInputCustom
              value={inTime}
              placeholder={appConstant.IN_TIME}
              inputViewStyle={{
                backgroundColor: "white",
                borderColor: "white",
              }}
              rightIcon={imageConstant.IMAGE_TIME_ICON}
              rightIconStyle={styles.timeIconStyle}
              onChangeText={(text) => {
                // setInTime(text);
              }}
              onPressRight={showInTimePicker}
            />
            <Pressable
              onPress={showInTimePicker}
              style={{
                width: "100%",
                height: "100%",
                flex: 1,
                position: "absolute",
              }}
            />
          </View>
          <View style={[styles.inputTimeText, { marginLeft: 10 }]}>
            <TextInputCustom
              value={outTime}
              placeholder={appConstant.OUT_TIME}
              inputViewStyle={{
                backgroundColor: "white",
                borderColor: "white",
              }}
              rightIcon={imageConstant.IMAGE_TIME_ICON}
              rightIconStyle={styles.timeIconStyle}
              onChangeText={(text) => {
                // setOutTime(text);
              }}
              onPressRight={showOutTimePicker}
            />
            <Pressable
              onPress={showOutTimePicker}
              style={{
                width: "100%",
                height: "100%",
                flex: 1,
                position: "absolute",
              }}
            />
          </View>
        </View>
      </View>
      {isTimeInPickerVisible && (
        <DateTimePickerModal
          isVisible={isTimeInPickerVisible}
          mode="time"
          onConfirm={handleInTimeConfirm}
          onCancel={hideInTimePicker}
        />
      )}

      {isTimeOutPickerVisible && (
        <DateTimePickerModal
          isVisible={isTimeOutPickerVisible}
          mode="time"
          onConfirm={handleOutTimeConfirm}
          onCancel={hideOutTimePicker}
        />
      )}
      {isShowDistrictList ? (
        //  <View  style={styles.modalView}>
        <ScrollView style={[styles.viewFlatList]}>
          <FlatList
            data={arrayDistricts ? arrayDistricts : []}
            renderItem={renderDistrictList}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      ) : // </View>

      null}
    </View>
  );
};

AvailabilityItem.propTypes = {};

export default AvailabilityItem;
