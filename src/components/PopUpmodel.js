import {
  alertMsgConstant,
  appColor,
  fontConstant,
  imageConstant,
} from "@/constant";
import AvailabilityItem from "@/screen/availability/AvailabilityItem/EditItem";
import { get12HrFrom24HrFormat, getValueFromDeepKey } from "@/utils";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from "react-native";

const ModelBox = (props) => {
  const {
    modalVisible,
    setModalVisible,
    availabilityData,
    arrayDistricts,
    updateDataItemofAvailabilityAction,
    deleteDataItemofAvailabilityAction,
    editModal,
  } = props;
  const { index, date } = editModal;
  if (!index === null || !date || !availabilityData) {
    return <View></View>;
  }

  try {
    getValueFromDeepKey(availabilityData, `${date}.times.${index}`);
  } catch (error) {
    return <View></View>;
  }
  const { district_id, start_time, end_time } = getValueFromDeepKey(
    availabilityData,
    `${date}.times.${index}`
  );
  const [editedData, setEditableData] = React.useState({
    district_id,
    start_time: get12HrFrom24HrFormat(start_time),
    end_time: get12HrFrom24HrFormat(end_time),
  });

  const onEdit = () => {
    try {
      if (!editedData.district_id) {
        throw "Please Select District";
      } else if (!editedData.start_time) {
        throw "Please Add In Time";
      }
      if (!editedData.end_time) {
        throw "Please Add Out Time";
      }
      updateDataItemofAvailabilityAction({
        ...editedData,
        district_name: arrayDistricts.find(
          (_el) => _el.district_id === editedData.district_id
        )?.district_name,
        index,
        date,
      });
      setModalVisible(!modalVisible);
    } catch (error) {
      toast.show(error, {
        type: alertMsgConstant.TOAST_DANGER,
      });
    }
  };
  const onDelete = () => {
    try {
      // setModalVisible(!modalVisible);
      // deleteDataItemofAvailabilityAction({
      //   index,
      //   date,
      // });

      Alert.alert(
        alertMsgConstant.ALERT,
        alertMsgConstant.ARE_YOU_SURE_TO_DELETE,
        [
          {
            text: alertMsgConstant.CANCEL,
            onPress: () => {
              // setModalVisible(!modalVisible);
            },
          },
          {
            text: alertMsgConstant.OK,
            onPress: () => {
              setModalVisible(!modalVisible);
              deleteDataItemofAvailabilityAction({
                index,
                date,
              });
            },
          },
        ],
        {
          //   onDismiss: () => {
          //     setModalVisible(!modalVisible);
          //   },
          cancelable: false,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AvailabilityItem
              editedData={editedData}
              setEditableData={setEditableData}
              data={{
                index,
                date,
              }}
              arrayDistricts={arrayDistricts}
            />
            <View style={styles.row}>
              <Pressable onPress={() => onEdit()} style={styles.iconContainer}>
                <Image
                  source={imageConstant.IMAGE_SAVE_ICON}
                  style={{ height: 20, width: 20, marginRight: 10 }}
                />
                <Text style={styles.modalText}>Save</Text>
              </Pressable>
              <Pressable
                onPress={() => onDelete()}
                style={styles.iconContainer}
              >
                <Image
                  source={imageConstant.IMAGE_TRASH_ICON}
                  style={{ height: 20, width: 20, marginRight: 10 }}
                />
                <Text style={[styles.modalText, { color: appColor.RED }]}>
                  Delete
                </Text>
              </Pressable>
            </View>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                position: "absolute",
                right: -10,
                top: -10,
                zIndex: 10,
              }}
            >
              <Image
                source={imageConstant.IMAGE_CLOSE_ICON}
                style={{ height: 30, width: 30 }}
              />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.5)",
  },
  modalView: {
    width: "95%",
    marginHorizontal: 40,
    // backgroundColor: "#FAF9F6",
    backgroundColor: appColor.GRAY_DARK,

    borderRadius: 10,
    paddingHorizontal: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 12,
  },
  iconContainer: {
    padding: 12,
    borderColor: appColor.GRAY,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    // justifyContent:
    alignItems: "center",
    marginVertical: "2%",
    textAlign: "left",
    marginHorizontal: 10,
    // backgroundColor: appColor.LIGH_BLUE,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  modalText: {
    fontSize: fontConstant.TEXT_17_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
    color: appColor.BLACK,
    // color: appColor.WHITE,
  },
});

export default React.memo(ModelBox);
