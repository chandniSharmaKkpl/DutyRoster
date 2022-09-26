import { appColor } from "@/constant";
import { checkObjectHasData, getValueFromDeepKey } from "@/utils";
import { timeSheetBottomCardConfig } from "@/utils/TimeSheet";
import React from "react";
import { Text, View } from "react-native";
import { AppText } from "../AppText";
import styles from "./style";
const getData = (obj, parentKey, childKey, value) => {
  if (checkObjectHasData(obj, parentKey)) {
    // console.log(
    //   "getData",
    //   `${parentKey}.${childKey}`,
    //   getValueFromDeepKey(obj, `${parentKey}.${childKey}`)
    // );
    if (value) {
      return value(getValueFromDeepKey(obj, `${parentKey}.${childKey}`));
    } else {
      return getValueFromDeepKey(obj, `${parentKey}.${childKey}`);
    }
  }
  return "-";
};
export default function TimeSheetBottomCard(props) {
  const { cardData } = props;
  // console.log("Data =-===>", JSON.stringify(cardData, null, 4));
  if (!cardData) {
    return (
      <View style={styles.cardContainer}>
        {/* <Text>No Data Exist</Text> */}
      </View>
    );
  }

  return (
    <View style={styles.cardContainer}>
      {timeSheetBottomCardConfig.map((cardItem) => {
          console.log("value",JSON.stringify(cardItem,null,4));
        const { data, key } = cardItem;
        return (
          <>
            <View style={styles.cardConatinerDetails}>
              {cardItem.mainTitle && (
                <AppText text={cardItem.mainTitle} style={styles.mainTitle} />
              )}
              {data.map((item) => {
                return (
                  <>
                    <View style={styles.row}>
                      <View style={styles.titleColumn}>
                        <Text style={styles.textTitleColumn}>{item.title}</Text>
                      </View>

                      <View style={styles.valueColumn}>
                        <Text style={{color: appColor.BLACK}}>
                          {getData(cardData, key, item?.key, item?.value)}
                        </Text>
                        {item.label && (
                          <>
                            <View style={styles.valueLableContainer}>
                              <Text style={styles.textValueLable}>
                                {getData(
                                  cardData,
                                  key,
                                  item?.label?.key,
                                  item?.label?.value
                                )}
                              </Text>
                            </View>
                          </>
                        )}
                      </View>
                    </View>
                  </>
                );
              })}
            </View>
          </>
        );
      })}
    </View>
  );
}
