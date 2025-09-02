import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";

export default function Planos() {

  const [planos, setPlanos] = useState([]);
  const router = useRouter();
  const getPlanos = async () => {
    const response = await fetch('https://sk3c6h6g-3000.brs.devtunnels.ms/api/plano/mostrarPlano');
    const json = await response.json();
    setPlanos(json.data);
  }

  useEffect(() => {
    getPlanos();
  }, []);


  function Item({ plano }: { plano: { id: number; nome: string; checkins: number; valor: number; } }) {
    return (
      <View style={styles.containerPlanos}>
        <Link href="/updatePlano" asChild>
          <Button title={`${plano.nome} | ${plano.checkins} | R$ ${plano.valor}`} color="gray" ></Button>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciamento de Planos</Text>

      <FlatList
        data={planos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item plano={item} />}
        style={{ width: "100%" }}
      />

      <View style={styles.botaoCriar}>
        <Link href="/plano/createPlano" asChild>
          <Button title="Criar novo plano" color="gray" />
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

  containerPlanos: {
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
