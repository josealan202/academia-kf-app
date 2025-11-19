//@ts-nocheck

import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";

export default function Alunos() {
  const [aluno, setAlunos] = useState([]);

  const getAlunos = async () => {
    const response = await fetch('https://sk3c6h6g-3000.brs.devtunnels.ms/api/aluno/viewAluno');
    const json = await response.json();
    setAlunos(json.data);
  };

  const deletarAluno = async (id) => {
    try {
      const resposta = await fetch(`https://sk3c6h6g-3000.brs.devtunnels.ms/api/aluno/deleteAluno?id=${id}`, {
        method: 'DELETE',
      });

      const json = await resposta.json();

      if (resposta.ok) {
        Alert.alert("Sucesso", json.message);
        // Atualiza a lista de alunos
        setAlunos(prev => prev.filter(p => p.id !== id));
      } else {
        Alert.alert("Erro", json.error || "Não foi possível deletar o aluno.");
      }
    } catch (erro) {
      console.error("Erro ao deletar aluno:", erro);
      Alert.alert("Erro", "Ocorreu um erro inesperado.");
    }
  };

  useEffect(() => {
    getAlunos();
  }, []);

  function Item({ usuario }: { usuario: { id: number; nome: string; email: string; senha: string; sexo: string; diadopagamento: string } }) {
    return (
      <View style={styles.containerAlunos}>
        <Button title={`${usuario.nome}`} color="gray" />
        <Button
          title="Deletar"
          color="red"
          onPress={() => {
            Alert.alert(
              "Confirmar exclusão",
              "Deseja realmente deletar este aluno?",
              [
                { text: "Cancelar", style: "cancel" },
                { text: "Deletar", style: "destructive", onPress: () => deletarAluno(usuario.id) },
              ]
            );
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciamento de alunos</Text>

      <FlatList
        data={aluno}
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

  containerAlunos: {
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
  }
});
