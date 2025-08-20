import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function InserirTexto() {
  const [nomeTurma, setNomeTurma] = useState("");
  const [horarioTurma, setHorarioTurma] = useState("");
  const router = useRouter();

  const enviarTurma = async () => {
    try {
      const resposta = await fetch(
        "https://sv570p94-3000.brs.devtunnels.ms/api/createTurma",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: nomeTurma,
            horario: horarioTurma,
          }),
        }
      );

      if (resposta.ok) {
        Alert.alert("Sucesso", "Turma criada com sucesso!");
        router.push("/Turmas");
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
        placeholder="Horário da turma"
        placeholderTextColor="#aaa"
        value={horarioTurma}
        onChangeText={setHorarioTurma}
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
