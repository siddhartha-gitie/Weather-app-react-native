import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PhoneLogin = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Phone Login (OTP coming next)</Text>
    </View>
  );
};

export default PhoneLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f2027",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});


