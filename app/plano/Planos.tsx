//@ts-nocheck

import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '@/firebaseConfig';
import { signOut } from 'firebase/auth';

export default function Planos({ navigation }) {

  const [plano, setPlano] = useState([]);
  const [user, setUser] = useState(null);

    useEffect(() => {
        async function checkUser() {
            const savedUser = await AsyncStorage.getItem('@user');
            if (!savedUser) {
                navigation.replace('/menu');
            } else {
                setUser(JSON.parse(savedUser));
            }
        }
        checkUser();
    }, []);

  const handleLogout = async () => {
      await signOut(auth);
      await AsyncStorage.removeItem('@user');
      navigation.replace('/menu');
  };

  const router = useRouter();

  const getPlano = async () => {
    const response = await fetch('https://lz89qm1s-3000.brs.devtunnels.ms/api/plano/viewPlano');
    const json = await response.json();
    setPlano(json.data);
  }

  const deletarPlano = async (id) => {
  try {
    const resposta = await fetch(`https://lz89qm1s-3000.brs.devtunnels.ms/api/plano/deletePlano?id=${id}`, {
      method: 'DELETE',
    });

    const json = await resposta.json();

    if (resposta.ok) {
      Alert.alert("Sucesso", json.message);
      // Atualiza a lista de planos
      setPlano(prev => prev.filter(p => p.id !== id));
    } else {
      Alert.alert("Erro", json.error || "Não foi possível deletar o plano.");
    }
    } catch (erro) {
      console.error("Erro ao deletar plano:", erro);
      Alert.alert("Erro", "Ocorreu um erro inesperado.");
    }
  };


  useEffect(() => {
    getPlano();
  }, []);


  function Item({ plano }: { plano: { id: number; quantvezesnasemana: number; checkins: number; valor: number; } }) {
    return (
      <View style={styles.containerPlanos}>
        <Link href="/plano/assinantes" asChild
      >
        <Button 
          title={`${plano.quantvezesnasemana} dia(s) na semana | ${plano.checkins} Check-ins | R$ ${plano.valor} reais`} 
          color="gray" 
          />
        </Link>

        <Button
        title="Deletar"
        color="red"
        onPress={() => {
          Alert.alert(
            "Confirmar exclusão",
            "Deseja realmente deletar este plano?",
            [
              { text: "Cancelar", style: "cancel" },
              { text: "Deletar", style: "destructive", onPress: () => deletarPlano(plano.id) },
            ]
          );
        }}
      />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciamento de Planos</Text>

      <FlatList
        data={plano}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item plano={item} />}
        style={{ width: "100%" }}
      />

      <View style={{ marginVertical: 20, width: "100%" }}>
        <Link href="/plano/createPlano" asChild>
          <Button title="Criar novo plano" color="gray" />
        </Link>

      <View style={{ height: 10 }} />

        <Link href="/plano/viewUpdatePlano" asChild>
          <Button title="Editar plano" color="gray" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 40,
    paddingHorizontal: 10,
  },

  containerPlanos: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 20,
    paddingHorizontal: 15,
  },  

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },

  botaoItem: {
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 6,
  },

  texto: {
    fontSize: 18,
    color: "white",
  },

  botoes: {
    flexDirection: "row",
  },

  botaoCriar: {
    marginVertical: 50,
  }
  
});
