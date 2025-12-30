//@ts-nocheck

import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Membros() {

  const router = useRouter();
  const [membro, setMembros] = useState([]);
  const [user, setUser] = useState(null);

    useEffect(() => {
        async function checkUser() {
            const savedUser = await AsyncStorage.setItem('@user', JSON.stringify(user));
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


  const { id } = useLocalSearchParams();

  const getMembros = async () => {
    const response = await fetch(
      `https://lz89qm1s-3000.brs.devtunnels.ms/api/turma/membros/${id}`
    );

    const json = await response.json();
    setMembros(json.data);
  };


  useEffect(() => {
    getMembros();
  }, []);


  function Item({ usuario }: { usuario: { id: number; nome: string; email: string; senha: string; sexo: string; diadopagamento: string } }) {
    return (
      <View style={styles.containerMembros}>
          <Button title={`${usuario.nome}`} color="gray"></Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Membros da turma</Text>

      <FlatList
        data={membro}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item usuario={item} />}
        style={{ width: "100%" }}
      />
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

  containerMembros: {
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
  }
});
