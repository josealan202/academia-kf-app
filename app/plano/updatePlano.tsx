//@ts-nocheck

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '@/firebaseConfig';
import { signOut } from 'firebase/auth';

export default function EditarPlano() {
  const { id, quantvezesnasemana, checkins, valor } = useLocalSearchParams();
  const [quantvezesnasemanaPlano, setquantvezesnasemanaPlano] = useState(String(quantvezesnasemana) || "");
  const [checkinsPlano, setCheckinsPlano] = useState(String(checkins) || "");
  const [valorPlano, setValorPlano] = useState(String(valor) || "");
  const router = useRouter();
  const [user, setUser] = useState(null);

    useEffect(() => {
        async function checkUser() {
            const savedUser = await AsyncStorage.getItem('@user');
            if (!savedUser) {
                router.replace("/"); 
            } else {
                setUser(JSON.parse(savedUser));
            }
        }
        checkUser();
    }, []);

  const handleLogout = async () => {
      await signOut(auth);
      await AsyncStorage.removeItem('@user');
      router.replace("/menu"); 
  };

  const atualizarPlano = async () => {
    try {
      const resposta = await fetch(
        "https://lz89qm1s-3000.brs.devtunnels.ms/api/plano/updatePlano",
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            quantvezesnasemana: parseInt(quantvezesnasemanaPlano),
            checkins: parseInt(checkinsPlano),
            valor: parseFloat(valorPlano),
          }),
        }
      );

      if (resposta.ok) {
        Alert.alert("Sucesso", "Plano atualizado com sucesso!");
        router.dismissAll();
        router.replace("/plano/Planos");
      } else {
        const erro = await resposta.json();
        Alert.alert("Erro", erro.error || "Não foi possível atualizar o plano.");
      }
    } catch (erro) {
      console.error("Erro ao atualizar plano:", erro);
      Alert.alert("Erro", "Ocorreu um erro inesperado.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Plano</Text>

      <TextInput
        style={styles.input}
        placeholder="Quantidade de vezes da semana do plano"
        placeholderTextColor="#aaa"
        value={quantvezesnasemanaPlano}
        keyboardType="numeric"
        maxLength={1}
        onChangeText={setquantvezesnasemanaPlano}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade de check-ins do plano"
        placeholderTextColor="#aaa"
        value={checkinsPlano}
        keyboardType="numeric"
        maxLength={2}
        onChangeText={setCheckinsPlano}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor do plano"
        placeholderTextColor="#aaa"
        value={valorPlano}
        keyboardType="decimal-pad"
        maxLength={3}
        onChangeText={setValorPlano}
      />

      <View style={styles.botao}>
        <Button title="Salvar Alterações" color="gray" onPress={atualizarPlano} />
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
    width: "70%",
  }

});
