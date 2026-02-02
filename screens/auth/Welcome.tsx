import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <Text style={styles.subtitle}>Welcome 👋</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.outline]}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.outlineText}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f2027",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "700",
  },
  subtitle: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#2c5364",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#2c5364",
  },
  outlineText: {
    color: "#2c5364",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
