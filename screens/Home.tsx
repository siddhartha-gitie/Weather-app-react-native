import React, { useEffect, useRef } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTemp } from "../context/TempartureContext";
import Loading from "./Loading";
import BottomSheet from "../components/BottomSheet";

import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const { width } = Dimensions.get("window");

const Home = () => {
  const date = new Date();
  const Full_Date = date.toDateString();

  const { tempMode, weatherData }: any = useTemp();

  const hintOpacity = useRef(new Animated.Value(1)).current;

  /* 🔁 Swipe hint animation */
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(hintOpacity, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(hintOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  /* 🔓 LOGOUT */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!weatherData) return <Loading />;

  const {
    main: { temp, humidity, pressure },
    weather,
    wind,
    name,
  } = weatherData;

  const main = weather?.[0]?.main ?? "Clear";
  const hour = date.getHours();
  const wind_speed = wind?.speed ?? 0;

  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}
      style={styles.main}
    >
      <StatusBar style="light" />

      {/* TOP CONTENT */}
      <View style={styles.top}>
        <Text style={styles.date}>{Full_Date}</Text>
        <Text style={styles.location}>{name}</Text>

        <Image
          style={styles.icon}
          source={
            main === "Clear"
              ? hour < 19
                ? require("../assets/weatherIcons/Sunny.png")
                : require("../assets/weatherIcons/Night_Clear.png")
              : require("../assets/weatherIcons/Cloudy.png")
          }
        />

        <Text style={styles.temp}>
          {Math.round(temp)}
          <Text style={styles.unit}>
            {tempMode ? "°F" : "°C"}
          </Text>
        </Text>

        <Text style={styles.condition}>{main}</Text>

        {/* SWIPE HINT */}
        <Animated.Text
          style={[styles.hint, { opacity: hintOpacity }]}
        >
          Swipe up for more details ↑
        </Animated.Text>

        {/* LOGOUT BUTTON */}
        <Pressable
          onPress={handleLogout}
          style={styles.logoutBtn}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      {/* BOTTOM SHEET */}
      <BottomSheet>
        <View style={styles.details}>
          <DetailBox
            icon="water-outline"
            value={`${humidity}%`}
            label="Humidity"
          />
          <DetailBox
            icon="weather-windy"
            value={`${wind_speed} m/s`}
            label="Wind"
          />
          <DetailBox
            icon="weather-pouring"
            value={`${pressure} hPa`}
            label="Pressure"
          />
        </View>
      </BottomSheet>
    </LinearGradient>
  );
};

const DetailBox = ({ icon, value, label }: any) => (
  <View style={styles.box}>
    <MaterialCommunityIcons
      name={icon}
      size={32}
      color="#fff"
    />
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  top: {
    alignItems: "center",
    marginTop: "15%",
  },

  date: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
  },

  location: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "600",
  },

  icon: {
    height: 150,
    width: 150,
    marginVertical: 20,
  },

  temp: {
    fontSize: 72,
    color: "#fff",
    fontWeight: "300",
  },

  unit: {
    fontSize: 32,
    color: "rgba(255,255,255,0.4)",
  },

  condition: {
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 2,
    marginBottom: 10,
  },

  hint: {
    marginTop: 12,
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
  },

  logoutBtn: {
    marginTop: 20,
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  logoutText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  details: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },

  box: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 22,
    paddingVertical: 20,
    width: width / 3.5,
  },

  value: {
    color: "#fff",
    marginTop: 8,
    fontSize: 14,
  },

  label: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    marginTop: 4,
  },
});
