import { Text, View, StyleSheet } from "react-native";

const dados = [
  {
    id: 1,
    nome: 'Alan',
    cor: 'branco'
  },
  {
    id: 2,
    nome: 'Venícios',
    cor: 'branco'
  },
  {
    id: 3,
    nome: 'João Vitor',
    cor: 'pardo'
  }    
]

export default function Index() {
  return (
    <View style={style.container}>

      
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
}})