import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Link } from "expo-router";

export default function Turmas() {

  const [turmas, setTurmas] = useState([]);
  const getTurmas = async () => {
    const response = await fetch('https://sk3c6h6g-3000.brs.devtunnels.ms/api/turma/mostrarTurma');
    const json = await response.json();
    setTurmas(json.data);
  }

  useEffect(() => {
    getTurmas();
  }, []);


  function Item({ turma }) {
    return (
      <View style={styles.containerTurmas}>
        <Link href="/turma/Membros" asChild>
          <Button title={`${turma.nome} | ${turma.horario}`} color="gray" ></Button>
        </Link>
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

      <View style={styles.botaoCriar}>
        <Link href="/turma/createTurma" asChild>
          <Button title="Criar nova turma" color="gray" />
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
