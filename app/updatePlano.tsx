import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useState } from "react";

export default function AlterarPlano() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [nomePlano, setNomePlano] = useState("");
  const [checkinsPlano, setCheckinsPlano] = useState("");
  const [valorPlano, setValorPlano] = useState("");

  const atualizarPlano = async () => {
    try {
      const resposta = await fetch(
        `https://sk3c6h6g-3000.brs.devtunnels.ms/api/updatePlano/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id, // precisa ser incluído aqui, pois o backend espera isso no body
            nome: nomePlano || null,
            checkins: checkinsPlano ? parseInt(checkinsPlano) : null,
            valor: valorPlano ? parseFloat(valorPlano) : null,
          }),
        }
      );

      if (resposta.ok) {
        Alert.alert("Sucesso", "Plano atualizado com sucesso!");
        router.push("/plano/Planos");
      } else {
        const data = await resposta.json();
        Alert.alert("Erro", data?.error || "Não foi possível atualizar o plano.");
      }
    } catch (erro) {
      console.error("Erro ao atualizar plano:", erro);
      Alert.alert("Erro", "Ocorreu um erro inesperado.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alterar Plano (ID: {id})</Text>

      <TextInput
        style={styles.input}
        placeholder="Novo nome do plano"
        placeholderTextColor="#aaa"
        value={nomePlano}
        onChangeText={setNomePlano}
      />

      <TextInput
        style={styles.input}
        placeholder="Nova quantidade de check-ins"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={checkinsPlano}
        onChangeText={setCheckinsPlano}
      />

      <TextInput
        style={styles.input}
        placeholder="Novo valor"
        placeholderTextColor="#aaa"
        keyboardType="decimal-pad"
        value={valorPlano}
        onChangeText={setValorPlano}
      />

      <View style={styles.botao}>
        <Button title="Atualizar" color="gray" onPress={atualizarPlano} />
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
  },
});
