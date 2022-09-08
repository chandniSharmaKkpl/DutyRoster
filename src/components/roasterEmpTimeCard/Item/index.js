import { EmpTimeCardDateFormate } from "@/common/timeFormate";
import { cardConfig, extractData } from "@/utils/Roster";
import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";

const Item = ({ item }) => {
  const _date = item[0];
  const items = item[1];
  const isItemsNotEmpty = items && items.length > 0;
  //   console.log("key", _date);
  //   console.log("value", items);

  return (
    <View style={styles.timeCardContainer} key={_date}>
      <View style={styles.dateContainerTextCenter}>
        <Text style={styles.day_date_style}>
          {EmpTimeCardDateFormate(_date)}
        </Text>
      </View>
      <View style={styles.titleContainer}>
        {cardConfig.map((_el) => {
          return (
            <View>
              <Text
                style={[
                  styles.titleText,
                  {
                    minWidth: _el.maxWidth,
                    textAlign: _el.textAlign ?? "left",
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
            return (
              <>
                <View style={styles.contentTextContainer}>
                  {cardConfig.map((_el) => {
                    return (
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
