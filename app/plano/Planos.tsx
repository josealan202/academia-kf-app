import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";

export default function Planos() {

  const [plano, setPlano] = useState([]);
  const router = useRouter();
  const getPlano = async () => {
    const response = await fetch('https://sk3c6h6g-3000.brs.devtunnels.ms/api/plano/mostrarPlano');
    const json = await response.json();
    setPlano(json.data);
  }

  const deletarPlano = async (id) => {
  try {
    const resposta = await fetch(`https://sk3c6h6g-3000.brs.devtunnels.ms/api/plano/deletePlano?id=${id}`, {
      method: 'DELETE',
    });

    const json = await resposta.json();

    if (resposta.ok) {
      Alert.alert("Sucesso", json.message);
      // Atualiza a lista de planos
      setPlano(prev => prev.filter(p => p.id !== id));
    } else {
      Alert.alert("Erro", json.error || "Não foi possível deletar o plano.");
    }
    } catch (erro) {
      console.error("Erro ao deletar plano:", erro);
      Alert.alert("Erro", "Ocorreu um erro inesperado.");
    }
  };


  useEffect(() => {
    getPlano();
  }, []);


  function Item({ plano }: { plano: { id: number; quantvezesnasemana: number; checkins: number; valor: number; } }) {
    return (
      <View style={styles.containerPlanos}>
        <Link 
          href={{
            pathname: "/plano/updatePlano",
            params: {
            id: plano.id,
            quantvezesnasemana: plano.quantvezesnasemana,
            checkins: plano.checkins,
            valor: plano.valor,
          },
        }} 
        asChild
      >
        <Button 
          title={`${plano.quantvezesnasemana} dias na semana | ${plano.checkins} | R$ ${plano.valor}`} 
          color="gray" 
          />
        </Link>

        <Button
        title="Deletar"
        color="red"
        onPress={() => {
          Alert.alert(
            "Confirmar exclusão",
            "Deseja realmente deletar este plano?",
            [
              { text: "Cancelar", style: "cancel" },
              { text: "Deletar", style: "destructive", onPress: () => deletarPlano(plano.id) },
            ]
          );
        }}
      />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciamento de Planos</Text>

      <FlatList
        data={plano}
        keyExtractor={(item) => item.id.toString()}
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
