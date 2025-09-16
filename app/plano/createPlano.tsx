import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function InserirTexto() {
  const [quantvezesnasemanaPlano, setquantvezesnasemanaPlano] = useState("");
  const [checkinsPlano, setCheckinsPlano] = useState("");
  const [valorPlano, setValorPlano] = useState("");
  const router = useRouter();

  const enviarPlano = async () => {
    try {
      const resposta = await fetch(
        "https://sk3c6h6g-3000.brs.devtunnels.ms/api/plano/createPlano",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantvezesnasemana: parseInt(quantvezesnasemanaPlano),
            checkins: parseInt(checkinsPlano), // convertido para número inteiro
            valor: parseFloat(valorPlano),     // convertido para número decimal
          }),
        }
      );

      if (resposta.ok) {
        Alert.alert("Sucesso", "Plano criado com sucesso!");
        router.dismissAll();
        router.replace("/plano/Planos");
      } else {
        Alert.alert("Erro", "Não foi possível criar o plano.");
      }
    } catch (erro) {
      console.error("Erro ao enviar plano:", erro);
      Alert.alert("Erro", "Ocorreu um erro inesperado.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Inserir Plano</Text>

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
        <Button title="Criar" color="gray" onPress={enviarPlano} />
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
