/*import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function InserirTexto() {

  const [turmas, setTurmas] = useState([]);
    const setTurmas = async () => {
      fetch('https://mywebsite.com/endpoint/', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'nome',
    secondParam: 'horario',
  }),
});

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Inserir Texto</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite algo..."
        placeholderTextColor="#aaa"
        value={turmas}
        onChangeText={setTurmas}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite algo..."
        placeholderTextColor="#aaa"
        value={turmas}
        onChangeText={setTurmas}
      />

      <View style={styles.botao}>
        <Button
          title="Enviar"
          color="gray"
          onPress={() => {
            // aqui poderia enviar ou salvar o texto
          }}
        />
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
*/