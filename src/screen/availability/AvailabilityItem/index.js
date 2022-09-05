import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  BackHandler,
  Keyboard,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import styles from "../style";
import PropTypes from "prop-types";
import { Images } from "@/constant/svgImgConst";
import { AppText } from "@/components/AppText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appConstant, imageConstant } from "@/constant";
import { TextInputCustom } from "@/screen/availability/AvailabilityItem/TextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DropDownPicker from "react-native-dropdown-picker";
import { SET_DATA_TYPE } from "@/utils/Availablity";
import moment from "moment";

const AvailabilityItem = (props) => {
  const {
    selectedDistrict,
    data,
    arrayDistricts,

    addNewAvailabilityAction,
    removeAvailabilityAction,
    setDataItemofAvailabilityAction,
  } = props;

  const { district_id, inTime, outTime, id } = data;
  const [isShowDistrictList, setIsShowDistrictList] = useState(false);
  const [isTimeInPickerVisible, setTimeInPickerVisibility] = useState(false);
  const [isTimeOutPickerVisible, setTimeOutPickerVisibility] = useState(false);
  const showOutTimePicker = () => {
    setTimeOutPickerVisibility(true);
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
    setDataItemofAvailabilityAction({
      type: SET_DATA_TYPE.outTime,
      data: moment(date).format("hh:mm A"),
      id: id,
    });
    hideOutTimePicker();
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
    <View>
      <View style={styles.viewTopTitle}>
        {/* Showing plus minus icon besides districts title */}
        <View style={styles.districts}>
          <AppText
            style={styles.txtUnavailablity}
            text={appConstant.DISCTRICTS}
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
              setIsShowDistrictList(!isShowDistrictList);
            }}
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
                // width: "45%",
                backgroundColor: "white",
                borderColor: "white",
              }}
              rightIcon={imageConstant.IMAGE_TIME_ICON}
              rightIconStyle={styles.timeIconStyle}
              onChangeText={(text) => {
                // setInTime(text);
              }}
              onPressRight={showInTimePicker}
              onPressIn={showInTimePicker}
              //
            />
          </View>
          <View style={[styles.inputTimeText, { marginLeft: 10 }]}>
            <TextInputCustom
              value={outTime}
              placeholder={appConstant.OUT_TIME}
              inputViewStyle={{
                // width: "45%",
                backgroundColor: "white",
                borderColor: "white",
              }}
              rightIcon={imageConstant.IMAGE_TIME_ICON}
              rightIconStyle={styles.timeIconStyle}
              onChangeText={(text) => {
                // setOutTime(text);
              }}
              onPressRight={showOutTimePicker}
              onPressIn={showOutTimePicker}
              //   style={styles.inputTimeText}
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
        <View style={[styles.viewFlatList]}>
          <FlatList
            data={arrayDistricts ? arrayDistricts : []}
            renderItem={renderDistrictList}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : null}
    </View>
  );
};

AvailabilityItem.propTypes = {};

export default AvailabilityItem;
