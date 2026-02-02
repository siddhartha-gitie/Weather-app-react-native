import React, { ReactNode, useRef } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

const COLLAPSED = height * 0.85;
const EXPANDED = height * 0.45;

const BottomSheet = ({ children }: { children: ReactNode }) => {
  const translateY = useRef(new Animated.Value(COLLAPSED)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dy) > 8,

      onPanResponderMove: (_, gesture) => {
        const newY = Math.min(
          COLLAPSED,
          Math.max(EXPANDED, COLLAPSED + gesture.dy)
        );
        translateY.setValue(newY);
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -50) {
          Animated.spring(translateY, {
            toValue: EXPANDED,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateY, {
            toValue: COLLAPSED,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.sheet,
        { transform: [{ translateY }] },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.handle} />
      {children}
    </Animated.View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    height,
    backgroundColor: "rgba(15,32,39,0.95)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 16,
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 20,
  },
});
