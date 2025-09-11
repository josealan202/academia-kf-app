import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Link } from "expo-router";

export default function Membros() {

  const [membro, setMembros] = useState([]);
  const getMembros = async () => {
    const response = await fetch('https://sv570p94-3000.brs.devtunnels.ms/api/turma/membrosTurma');
    const json = await response.json();
    setMembros(json.data);
  }

  useEffect(() => {
    getMembros();
  }, []);


  function Item({ usuario }) {
    return (
      <View style={styles.containerMembros}>
        <Link href="/" asChild>
          <Button title={`${usuario.nome}`} color="gray"></Button>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Membros da turma</Text>

      <FlatList
        data={membro}
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

  containerMembros: {
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
