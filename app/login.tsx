// @ts-nocheck
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [emailLog, setEmailLog] = useState("");
  const [senhaLog, setSenhaLog] = useState("");
  const [loading, setLoading] = useState(false);

  async function loginEmailSenha() {
    if (!emailLog || !senhaLog) {
      return Alert.alert("Erro", "Preencha email e senha.");
    }

    setLoading(true);

    try {
      const resp = await fetch(
        "http://26.125.24.172:3000/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailLog, senhaLog })
        }
      );

      const dados = await resp.json();

      if (!resp.ok) {
        setLoading(false);
        return Alert.alert("Erro", dados.mensagem);
      }

      await AsyncStorage.setItem("@user", JSON.stringify(dados.usuario));
      setLoading(false);

      navigation.replace("menu");
    } catch (error) {
      console.log("ERRO FETCH:", error);
      Alert.alert("Erro", String(error));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/800px-Google_2015_logo.svg.png"
          }}
          style={styles.logo}
        />

        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>
          Faça login para continuar
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={emailLog}
          onChangeText={setEmailLog}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={senhaLog}
          onChangeText={setSenhaLog}
        />

        <TouchableOpacity
          style={[styles.button, styles.emailButton]}
          onPress={loginEmailSenha}
        >
          <Text style={styles.buttonText}>
            {loading ? "Entrando..." : "Entrar com Email"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.divider}>OU</Text>

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            }}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Entrar com Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000"
  },

  card: {
    width: "88%",
    backgroundColor: "#111",
    padding: 25,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 8
  },

  logo: {
    width: 90,
    height: 40,
    alignSelf: "center",
    marginBottom: 20,
    tintColor: "#fff"
  },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5
  },

  subtitle: {
    color: "#ccc",
    textAlign: "center",
    marginBottom: 25,
    fontSize: 15
  },

  input: {
    backgroundColor: "#222",
    color: "white",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333"
  },

  button: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center"
  },

  emailButton: {
    backgroundColor: "#444"
  },

  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600"
  },

  divider: {
    textAlign: "center",
    color: "#777",
    marginVertical: 20,
    fontWeight: "bold"
  },

  googleButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  googleIcon: {
    width: 22,
    height: 22,
    marginRight: 10
  },

  googleText: {
    color: "#000",
    fontSize: 17,
    fontWeight: "600"
  }
});
