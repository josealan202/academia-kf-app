//@ts-nocheck

import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Index() {

  const router = useRouter();
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

  const MenuButton = ({ title, href }) => (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.menuButtonText}>{title}</Text>
      </TouchableOpacity>
    </Link>
  );

  return ( 
  <View style={styles.container}>
    <Image 
      source={require('@/assets/images/logogladiadores.jpeg')}
      style={styles.topImage}
    />
    <View style={styles.buttonsArea}>
      <MenuButton title="Turmas" href="/turma/Turmas" />
      <MenuButton title="Planos" href="/plano/Planos" />
      <MenuButton title="Alunos" href="/alunos" />
      <MenuButton title="Pagamentos" href="/Pagamentos" />
      <MenuButton title="Check-ins" href="/Checkins" />
    </View>

  </View>
);
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    paddingTop: 60,
    alignItems: "center",
  },

  buttonsArea: {
    width: "100%",
    marginTop: 10,
  },

  topImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 35,
    borderWidth: 3,
    borderColor: "#ffffff22",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },

  menuButton: {
    width: "100%",
    paddingVertical: 22,
    paddingHorizontal: 25,
    
    backgroundColor: "#1a1a1a",

    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",

    justifyContent: "center",

    // Efeito leve de destaque ao toque
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },

  menuButtonText: {
    color: "white",
    fontSize: 21,
    fontWeight: "600",
    textAlign: "left",
    letterSpacing: 1,
  },
});


