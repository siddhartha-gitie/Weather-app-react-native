import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { auth } from "../../firebase/firebase";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

export default function RootNavigator() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <AppStack /> : <AuthStack />;
}
