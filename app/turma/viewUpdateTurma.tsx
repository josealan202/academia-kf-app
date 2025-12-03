//@ts-nocheck

import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Turmas() {

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

  const [turmas, setTurmas] = useState([]);
  const getTurmas = async () => {
    const response = await fetch('https://sk3c6h6g-3000.brs.devtunnels.ms/api/turma/viewTurma');
    const json = await response.json();
    setTurmas(json.data);
  }

  useEffect(() => {
    getTurmas();
  }, []);


  function Item({ turma }: { turma: { id: number; nome: string; horario: string; turno: string; } }) {
    const horarioFormatado = turma.horario ? turma.horario.slice(0, 5) : "";

    return (
      <View style={styles.containerTurmas}>
        <Link 
          href={{
            pathname: "/turma/updateTurma",
            params: {
            id: turma.id,
            nome: turma.nome,
            horario: turma.horario,
            turno: turma.turno,
          },
        }} 
        asChild
      >
          <Button title={`${turma.nome} | ${horarioFormatado} | ${turma.turno}`} color="gray"/>          
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Clique em uma turma para editar</Text>

      <FlatList
        data={turmas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item turma={item} />}
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

  containerTurmas: {
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
    marginVertical: 50
  }
  
});
