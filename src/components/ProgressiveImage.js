import { imageConstant } from "@/constant";
import React from "react";
import { View, StyleSheet, Image, Animated } from "react-native";

const styles = StyleSheet.create({
  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    // marginTop: 50,
    // backgroundColor : 'red'
  },
  container: {
    // backgroundColor: "#000",
    // position: 'relative'
  },
});

const ProgressiveImage = (props) => {
  const { thumbnailSource, source, style } = props;

  const thumbnailAnimated = new Animated.Value(0);
  const imageAnimated = new Animated.Value(0);

  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
    }).start();
  };

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        {...props}
        source={thumbnailSource}
        style={[style, { opacity: thumbnailAnimated }]}
        onLoad={handleThumbnailLoad}
      />
      <Animated.Image
        {...props}
        source={source}
        style={[styles.imageOverlay, {opacity: imageAnimated}, style]}
        onLoad={onImageLoad}
      />
    </View>
  );
};

export default ProgressiveImage;
