import React, { useState } from "react";
import { View, Text, FlatList, Image, Pressable } from "react-native";
import styles from "../style";
import { AppText } from "@/components/AppText";
import { alertMsgConstant, appConstant, imageConstant } from "@/constant";
import { TextInputCustom } from "@/screen/availability/AvailabilityItem/TextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ScrollView } from "react-native-gesture-handler";
// import DropDownPicker from "@/utils/"
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { isInOutTimeValid } from "@/utils/Availablity";
import moment from "moment";
import { API_DATE_FORMAT, changeDateFormat, USER_DATE_FORMAT } from "@/utils";

const AvailabilityItem = (props) => {
  const { data, arrayDistricts, editedData, setEditableData } = props;
  const districtRef = React.useRef();
  console.log("Edit => AvailabilityItem => data", data);
  const { date: availibilityDate } = data;

  const { district_id, start_time, end_time } = editedData;
  const [isShowDistrictList, setIsShowDistrictList] = useState(false);
  const [isTimeInPickerVisible, setTimeInPickerVisibility] = useState(false);
  const [isTimeOutPickerVisible, setTimeOutPickerVisibility] = useState(false);
  const showOutTimePicker = () => {
    if (editedData.start_time) {
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
    setEditableData({
      ...editedData,
      start_time: moment(date).format("hh:mm A"),
      end_time: null,
    });
    hideInTimePicker();
  };
  const hideOutTimePicker = () => {
    setTimeOutPickerVisibility(false);
  };

  const handleOutTimeConfirm = (date) => {
    if (editedData.start_time) {
      if (isInOutTimeValid(editedData.start_time, date)) {
        setEditableData({
          ...editedData,
          end_time: moment(date).format("hh:mm A"),
        });
        hideOutTimePicker();
      } else {
        if (editedData.end_time) {
          setEditableData({
            ...editedData,
            end_time: null,
          });
        }
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
            setIsShowDistrictList(false);
            setEditableData({
              ...editedData,
              district_id: item.district_id,
            });
          }}
        >
          <Text style={styles.textRow}>{item.district_name}</Text>
        </Pressable>
        <View style={styles.singleLine} />
      </View>
    );
  };
  return (
    <View
      style={[
        styles.availabilityContainer,
        {
          width: wp("100%"),
        },
      ]}
    >
      <View style={styles.viewTopTitle}>
        {/* Showing plus minus icon besides districts title */}
        <View style={styles.dateTitleContainer}>
          <AppText
            style={styles.txtDateTitle}
            text={changeDateFormat(
              availibilityDate,
              API_DATE_FORMAT,
              USER_DATE_FORMAT
            )}
          />
        </View>
        <View style={styles.districts}>
          <AppText
            style={styles.txtUnavailablity}
            text={appConstant.DISTRICTS}
          />
        </View>

        {/* Showing district list  */}
        <View style={styles.buttonReason}>
          <Pressable
            onPress={() => {
              setIsShowDistrictList(!isShowDistrictList);
            }}
            ref={districtRef}
          >
            <View
              style={[
                styles.buttonInsideReason,
                {
                  // backgroundColor:appColor.BLACK
                },
              ]}
            >
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
          </Pressable>
        </View>
      </View>

      {/* Time */}
      <View style={styles.viewTopTitle}>
        <AppText style={styles.txtUnavailablity} text={appConstant.TIME} />

        <View style={styles.inOutTimeContainer}>
          <View style={[styles.inputTimeText, { marginRight: 10 }]}>
            <TextInputCustom
              value={start_time}
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
              value={end_time}
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
        <ScrollView
          style={[
            styles.viewFlatList,
            {
              maxHeight: 200,
              zIndex: 1,
            },
          ]}
        >
          <FlatList
            data={arrayDistricts ? arrayDistricts : []}
            renderItem={renderDistrictList}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      ) : null}
    </View>
  );
};

AvailabilityItem.propTypes = {};

export default React.memo(AvailabilityItem);
