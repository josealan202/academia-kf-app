// @ts-nocheck

import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, Image, TextInput, Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from 'react-native';
//import { GoogleSignin } from "@react-native-google-signin/google-signin";

//Nesta tela eu estou fazendo o login!
export default function Login({ navigation }) {
  const [emailLog, setEmailLog] = useState("");
  const [senhaLog, setSenhaLog] = useState("");
  const [loading, setLoading] = useState(false);

  async function loginGoogle() {
    console.log("Fazendo login com o google!")
    /*
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      await AsyncStorage.setItem("@user", JSON.stringify(userInfo.user));

      navigation.replace("UserScreen");

    } catch (e) {
      console.log(e);
      Alert.alert("Erro", "Não foi possível entrar com o Google.");
    }
      */
  }

  async function loginEmailSenha() {
    if (!emailLog || !senhaLog) {
      return Alert.alert("Erro", "Preencha email e senha.");
    }

    console.log("Acabei de fazer login com o email e senha!")
    setLoading(true);

    try {
      //fazer chamada da api aqui para fazer login
      const resp = await fetch("https://sk3c6h6g-3000.brs.devtunnels.ms/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailLog, senhaLog })
      });

      const dados = await resp.json();

      if (!resp.ok) {
        setLoading(false);
        return Alert.alert("Erro", dados.mensagem);
      }
    
      await AsyncStorage.setItem("@user", JSON.stringify(dados.usuario));
      setLoading(false);

      navigation.replace("/index");

    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", "Falha ao conectar ao servidor.");
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" }}
        style={styles.logo}
      />

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Entre com Google ou Email/Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={emailLog}
        onChangeText={setEmailLog}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={senhaLog}
        onChangeText={setSenhaLog}
      />

      <TouchableOpacity
        style={[styles.button, styles.emailButton]}
        onPress={loginEmailSenha}
      >
        <Text style={styles.buttonText}>
          {loading ? "Entrando..." : "Login com Email"}
        </Text>
      </TouchableOpacity>

      <Text style={{ marginVertical: 20, fontSize: 16 }}>ou</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={loginGoogle}
      >
        <Text style={styles.buttonText}>Entrar com Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "black"
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 40
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 30,
        textAlign: "center"
    },
    input: {
        color: "white",
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 15,
        fontSize: 16
    },
    emailButton: {
        backgroundColor: "#333",
        marginBottom: 10
    },
    button: {
        backgroundColor: "#4285F4",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        textAlign: "center"
    }
});