import { Text, View, StyleSheet } from "react-native";

const usuarios = [
  {
    id: 1,
    nome: "Jurema",
    cargo: "Aluna"
  },
  {
    id: 2,
    nome: "Jubileu",
    cargo: "Aluno"
  },
    {
    id: 3,
    nome: "Cicinho Cabeção",
    cargo: "Personal"
  }
]

export default function Index() {
  return (
    <View style={style.container}

    >
      {
      usuarios.map(item => (
        <Text style = {{fontSize: 20}}>{item.nome}</Text>
      ))
      }
    </View>
  );
}
const style = StyleSheet.create ({
 
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  itemLista: {
    width: '100%',
    padding: 10,
    marginBottom: 2,
    backgroundColor: "blue"
  },

  textoLista:{
    fontSize: 20
  }
})