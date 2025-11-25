//@ts-nocheck

import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '@/firebaseConfig';
import { signOut } from 'firebase/auth';

export default function Turmas() {

  const router = useRouter();
  const [turmas, setTurmas] = useState([]);
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

  const getTurmas = async () => {
    const response = await fetch('https://sk3c6h6g-3000.brs.devtunnels.ms/api/turma/viewTurma');
    const json = await response.json();
    setTurmas(json.data);
  }

  const deletarTurma = async (id) => {
  try {
    const resposta = await fetch(`https://sk3c6h6g-3000.brs.devtunnels.ms/api/turma/deleteTurma?id=${id}`, {
      method: 'DELETE',
    });

    const json = await resposta.json();

    if (resposta.ok) {
      Alert.alert("Sucesso", json.message);
      // Atualiza a lista de turmas
      setTurmas(prev => prev.filter(p => p.id !== id));
    } else {
      Alert.alert("Erro", json.error || "Não foi possível deletar a turma.");
    }
    } catch (erro) {
      console.error("Erro ao deletar turma:", erro);
      Alert.alert("Erro", "Ocorreu um erro inesperado.");
    }
  };

  useEffect(() => {
    getTurmas();
  }, []);


  function Item({ turma }) {
    const horarioFormatado = turma.horario ? turma.horario.slice(0, 5) : "";

    return (
      <View style={styles.containerTurmas}>
        <Link href={`/turma/alunosTurma?id=${turma.id}`} asChild>
          <Button
            title={`${turma.nome} | ${horarioFormatado} | ${turma.turno}`}
            color="gray"
          />
        </Link>

        <Button
            title="Deletar"
            color="red"
            onPress={() => {
              Alert.alert(
                "Confirmar exclusão",
                "Deseja realmente deletar esta turma?",
              [
                { text: "Cancelar", style: "cancel" },
                { text: "Deletar", style: "destructive", onPress: () => deletarTurma(turma.id) },
              ]
            );
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciamento de Turmas</Text>

      <FlatList
        data={turmas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item turma={item} />}
        style={{ width: "100%" }}
      />

      <View style={{ marginVertical: 20, width: "100%" }}>
        <Link href="/turma/createTurma" asChild>
          <Button title="Criar nova turma" color="gray" />
        </Link>

      <View style={{ height: 10 }} />

        <Link href="/turma/viewUpdateTurma" asChild>
          <Button title="Editar turma" color="gray" />
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
