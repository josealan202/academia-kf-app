//@ts-nocheck

import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Planos() {

  const router = useRouter();
  const [plano, setPlano] = useState([]);
  const [user, setUser] = useState(null);

    useEffect(() => {
        async function checkUser() {
            const savedUser = await AsyncStorage.getItem('@user');
            if (!savedUser) {
                router.replace(""); 
            } else {
                setUser(JSON.parse(savedUser));
            }
        }
        checkUser();
    }, []);

  const handleLogout = async () => {
      await signOut(auth);
      await AsyncStorage.removeItem('@user');
      router.replace(""); 
  };

  const getPlano = async () => {
    const response = await fetch('https://lz89qm1s-3000.brs.devtunnels.ms/api/plano/viewPlano');
    const json = await response.json();
    setPlano(json.data);
  }

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
          title={`${plano.quantvezesnasemana} dia(s) na semana | ${plano.checkins} Check-ins | R$ ${plano.valor} reais`} 
          color="gray" 
          />
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Clique em um plano para editar</Text>

      <FlatList
        data={plano}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item plano={item} />}
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
  }
  
});
