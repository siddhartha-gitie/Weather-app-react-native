import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../../screens/auth/Welcome";
import Login from "../../screens/auth/Login";
import Signup from "../../screens/auth/Signup";
import PhoneLogin from "../../screens/auth/PhoneLogin";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="PhoneLogin" component={PhoneLogin} />
    </Stack.Navigator>
  );
}
