//@ts-nocheck

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CriarTurma() {
  
  const router = useRouter();
  const [user, setUser] = useState(null);

    useEffect(() => {
        async function checkUser() {
            const savedUser = await AsyncStorage.getItem('@user');
            if (!savedUser) {
                router.replace(""); 
            } else {
                setUser(JSON.parse(savedUser));
            }
        }
        checkUser();
    }, []);

  const handleLogout = async () => {
      await signOut(auth);
      await AsyncStorage.removeItem('@user');
      router.replace(""); 
  };

  const [nomeTurma, setNomeTurma] = useState("");
  const [horarioTurma, setHorarioTurma] = useState("");

  const enviarTurma = async () => {

  const regexHora = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!regexHora.test(horarioTurma)) {
    Alert.alert("Erro", "Digite um horário válido no formato HH:MM");
    return;
  }

  try {
    const resposta = await fetch(
      "https://lz89qm1s-3000.brs.devtunnels.ms/api/turma/createTurma",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nomeTurma,
          horario: horarioTurma
        }),
      }
    );

    if (resposta.ok) {
      Alert.alert("Sucesso", "Turma criada com sucesso!");
      router.dismissAll();
      router.replace("/turma/Turmas");
    } else {
      Alert.alert("Erro", "Não foi possível criar a turma.");
    }
  } catch (erro) {
    console.error("Erro ao enviar turma:", erro);
    Alert.alert("Erro", "Ocorreu um erro inesperado.");
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Inserir Turma</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da turma"
        placeholderTextColor="#aaa"
        value={nomeTurma}
        onChangeText={setNomeTurma}
      />

      <TextInput
        style={styles.input}
        placeholder="Horário da turma (HH:MM)"
        placeholderTextColor="#aaa"
        value={horarioTurma}
        onChangeText={(texto) => {
        // remove tudo que não é número
        let apenasNumeros = texto.replace(/\D/g, "");

        // limita em 4 caracteres (HHMM)
        if (apenasNumeros.length > 4) {
          apenasNumeros = apenasNumeros.slice(0, 4);
        }

        // formata para HH:MM
        let formatado = apenasNumeros;
        if (apenasNumeros.length >= 3) {
          formatado = apenasNumeros.slice(0, 2) + ":" + apenasNumeros.slice(2);
        }

          setHorarioTurma(formatado);
        }}
          keyboardType="numeric"
          maxLength={5}
        />

      <View style={styles.botao}>
        <Button title="Criar" color="gray" onPress={enviarTurma} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  titulo: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: "white",
    marginBottom: 20,
  },

  botao: {
    width: "50%",
  }
});
