//@ts-nocheck

import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function AssinantesPlano() {

  const router = useRouter();
  const { id } = useLocalSearchParams(); // id do plano
  const [assinantes, setAssinantes] = useState([]);

  const getAssinantes = async () => {
    try {
      const response = await fetch(
        `https://lz89qm1s-3000.brs.devtunnels.ms/api/plano/assinantesPlano/${id}`
      );
      const json = await response.json();
      setAssinantes(json.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAssinantes();
  }, []);

  function Item({ usuario }) {
    return (
      <View style={styles.containerMembros}>
        <Button title={usuario.nome} color="gray" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Assinantes do plano</Text>

      <FlatList
        data={assinantes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item usuario={item} />}
        style={{ width: "100%" }}
        ListEmptyComponent={
          <Text style={styles.textoVazio}>
            Nenhum assinante neste plano
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

  containerMembros: {
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

  textoVazio: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
});
