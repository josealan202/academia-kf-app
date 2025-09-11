import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EditarTurma() {
  const { id, nome, horario, turno } = useLocalSearchParams();
  const [nomeTurma, setNomeTurma] = useState(String(nome) || "");
  const [horarioTurma, setHorarioTurma] = useState(String(horario) || "");
  const [turnoTurma, setTurnoTurma] = useState(String(turno) || "");
  const router = useRouter();

  const atualizarTurma = async () => {
    try {
      const resposta = await fetch(
        "https://sv570p94-3000.brs.devtunnels.ms/api/turma/updateTurma",
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: parseInt(id),
            nome: nomeTurma,
            horario: horarioTurma,
            turno: turnoTurma,
          }),
        }
      );

      if (resposta.ok) {
        Alert.alert("Sucesso", "Turma atualizada com sucesso!");
        router.dismissAll();
        router.replace("/turma/Turmas");
      } else {
        const erro = await resposta.json();
        Alert.alert("Erro", erro.error || "Não foi possível atualizar a turma.");
      }
    } catch (erro) {
      console.error("Erro ao atualizar turma:", erro);
      Alert.alert("Erro", "Ocorreu um erro inesperado.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Turma</Text>

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

      <View style={styles.containerTurno}>
        <Text style={styles.turno}>Escolha um turno:</Text>
        {["Manhã", "Tarde", "Noite"].map((item) => (
          <Button
            key={item}
            title={item}
            color={turnoTurma === item ? "gray" : "black"}
            onPress={() => setTurnoTurma(item)}
          />
        ))}
      </View>

      <View style={styles.botao}>
        <Button title="Salvar Alterações" color="gray" onPress={atualizarTurma} />
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

  containerTurno: {
    flexDirection: "row", 
    justifyContent: "space-between"
  },

  titulo: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
  },

  turno: {
    color: "white"
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
