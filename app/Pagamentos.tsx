//@ts-nocheck

import { View, Text, Button, FlatList, Alert, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function Solicitacoes() {
  const router = useRouter();
  const [solicitacoes, setSolicitacoes] = useState([]);

  const carregarSolicitacoes = async () => {
    try {
      const res = await fetch(
        "https://sk3c6h6g-3000.brs.devtunnels.ms/api/solicitacao-plano/pendentes"
      );
      const data = await res.json();
      setSolicitacoes(data);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar solicitações");
    }
  };

  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  const responderSolicitacao = async (id, status) => {
    try {
      const res = await fetch(
        `https://sk3c6h6g-3000.brs.devtunnels.ms/api/solicitacao-plano/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) throw new Error();

      Alert.alert(
        "Sucesso",
        `Solicitação ${status === "aprovado" ? "aprovada" : "recusada"}`
      );

      setSolicitacoes(prev => prev.filter(s => s.id !== id));
    } catch {
      Alert.alert("Erro", "Não foi possível responder a solicitação");
    }
  };

  function Item({ item }) {
    return (
      <View style={styles.containerItem}>
        <Text style={styles.texto}>Usuário: {item.nome}</Text>
        <Text style={styles.texto}>
          Plano: {item.quantvezesnasemana}x por semana
        </Text>
        <Text style={styles.texto}>Valor: R$ {item.valor}</Text>

        <View style={{ marginTop: 10 }}>
          <Button
            title="Aceitar"
            onPress={() => responderSolicitacao(item.id, "aprovado")}
          />
        </View>

        <View style={{ marginTop: 5 }}>
          <Button
            title="Recusar"
            color="red"
            onPress={() => responderSolicitacao(item.id, "recusado")}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Solicitações de Plano</Text>

      <FlatList
        data={solicitacoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item item={item} />}
        style={{ width: "100%" }}
        ListEmptyComponent={
          <Text style={styles.textoVazio}>
            Nenhuma solicitação pendente
          </Text>
        }
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

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },

  containerItem: {
    backgroundColor: "black",
    paddingTop: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },

  texto: {
    fontSize: 16,
    color: "white",
    marginBottom: 5,
  },

  textoVazio: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
});
