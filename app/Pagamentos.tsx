import { View, Text, Button, FlatList, StyleSheet } from "react-native";

export default function Pagamentos() {
  // Lista fictícia de pagamentos (apenas para exibição)
  const pagamentos = [
    { id: "1", aluno: "André", valor: "R$ 200,00", data: "10/08/2025" },
    { id: "2", aluno: "Maria", valor: "R$ 150,00", data: "08/08/2025" },
    { id: "3", aluno: "João", valor: "R$ 180,00", data: "05/08/2025" },
  ];

  // Componente visual de cada pagamento
  function Item({ pagamento }) {
    return (
      <View style={styles.item}>
        <Text style={styles.texto}>
          {pagamento.aluno} - {pagamento.valor}
        </Text>
        <Text style={styles.subtexto}>{pagamento.data}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pagamentos Recentes</Text>

      <FlatList
        data={pagamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item pagamento={item} />}
        style={{ width: "100%" }}
      />

      <View style={styles.botaoAdicionar}>
        <Button title="Adicionar pagamento" color="gray" onPress={() => {}} />
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
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  item: {
    backgroundColor: "gray",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  texto: {
    fontSize: 18,
    color: "white",
  },
  subtexto: {
    fontSize: 14,
    color: "#ddd",
    marginTop: 5,
  },
  botaoAdicionar: {
    marginVertical: 50
  },
});
