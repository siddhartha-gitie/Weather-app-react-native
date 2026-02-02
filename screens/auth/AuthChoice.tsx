import { View, Text, Pressable } from "react-native";

export default function AuthChoice({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Welcome</Text>

      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={{ marginTop: 20 }}>Login</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text style={{ marginTop: 20 }}>Sign Up</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("PhoneLogin")}>
        <Text style={{ marginTop: 20 }}>Login with Phone</Text>
      </Pressable>
    </View>
  );
}
