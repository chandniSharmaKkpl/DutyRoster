import { EmpTimeCardDateFormate } from "@/common/timeFormate";
import { appColor, fontConstant } from "@/constant";
import {
  timeSheetCardConfig,
  extractData,
  inOutTimeFormate,
} from "@/utils/TimeSheet";
import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";

const Item = ({ item, key }) => {
  const _date = item[0];
  const items = item[1];
  const isItemsNotEmpty = items && items.length > 0;

  return (
    <View style={styles.timeCardContainer} key={key}>
      <View style={styles.dateContainerTextCenter}>
        <Text style={styles.day_date_style}>
          {EmpTimeCardDateFormate(_date)}
          {/* {_date} */}
        </Text>
      </View>
      <View style={styles.titleContainer}>
        {timeSheetCardConfig.map((_el) => {
          return (
            <View>
              <Text
                style={[
                  styles.titleText,
                  {
                    minWidth: _el.maxWidth,
                    textAlign: _el.titleAlignment ?? "left",
                  },
                ]}
              >
                {_el.title}
              </Text>
            </View>
          );
        })}
      </View>
      {isItemsNotEmpty ? (
        <View style={styles.contentContainer}>
          {items.map((_item) => {
            console.log("isItemsNotEmpty ==>", _item);
            return (
              <>
                <View style={styles.contentTextContainer}>
                  {timeSheetCardConfig.map((_el) => {
                    return (
                      <View
                        style={[
                          styles.contentText,
                          {
                            minWidth: _el.maxWidth,
                            flex: _el.flex,
                            textAlign: _el.textAlign ?? "left",
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.contentText,
                            {
                              minWidth: _el.maxWidth,
                              flex: _el.flex,
                              textAlign: _el.textAlign ?? "left",
                            },
                          ]}
                        >
                          {extractData(_item, _el)}
                        </Text>
                        {_el.flag && (
                          <Text
                            style={[
                              {
                                color: appColor.BLACK,
                                fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
                                fontSize: 12,
                                marginTop: -8,
                                textAlign: "center",
                              },
                            ]}
                          >
                            {inOutTimeFormate(_item, _el)}
                          </Text>
                        )}
                      </View>
                    );
                  })}
                </View>
              </>
            );
          })}
        </View>
      ) : (
        <View style={styles.emptyDataContainer}>
          <Text style={styles.emptyDataText}>Off</Text>
        </View>
      )}
    </View>
  );
};
export default Item;
