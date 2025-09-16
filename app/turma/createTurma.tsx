import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function InserirTexto() {
  const [nomeTurma, setNomeTurma] = useState("");
  const [horarioTurma, setHorarioTurma] = useState("");
  const [turnoTurma, setTurnoTurma] = useState("");
  const router = useRouter();

  const enviarTurma = async () => {

  const regexHora = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!regexHora.test(horarioTurma)) {
    Alert.alert("Erro", "Digite um horário válido no formato HH:MM");
    return;
  }

  try {
    const resposta = await fetch(
      "https://sk3c6h6g-3000.brs.devtunnels.ms/api/turma/createTurma",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nomeTurma,
          horario: horarioTurma,
          turno: turnoTurma
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
    width: "50%",
  }
  
});
