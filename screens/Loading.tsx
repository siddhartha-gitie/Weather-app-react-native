import React from "react";
import { View, Text, ActivityIndicator, Platform, StyleSheet } from "react-native";

const Loading = () => {
  // ✅ Web-safe fallback
  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.text}>Loading weather...</Text>
      </View>
    );
  }

  // 🔵 Mobile-only (Lottie disabled for now)
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ffffff" />
      <Text style={styles.text}>Loading weather...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#101010",
  },
  text: {
    color: "#ffffff",
    marginTop: 10,
  },
});
