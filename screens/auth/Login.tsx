import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../../firebase/firebase";
import { Platform } from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* ======================
     EMAIL LOGIN
  ====================== */
  const handleEmailLogin = async () => {
    setError(null);

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     GOOGLE LOGIN (WEB)
  ====================== */
  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError("Google login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <Pressable
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleEmailLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login with Email</Text>
        )}
      </Pressable>

      {/* GOOGLE LOGIN (WEB ONLY) */}
      {Platform.OS === "web" && (
        <>
          <Text style={styles.or}>OR</Text>

          <Pressable
            style={styles.googleButton}
            onPress={handleGoogleLogin}
          >
            <Text style={styles.googleText}>
              Continue with Google
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f2027",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#203a43",
    color: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  error: {
    color: "#ff6b6b",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2c5364",
    padding: 14,
    borderRadius: 10,
    marginTop: 6,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  or: {
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    marginVertical: 14,
  },
  googleButton: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 10,
  },
  googleText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "600",
  },
});
