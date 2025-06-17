import { Text, View, StyleSheet, FlatList } from "react-native";

const usuarios = [
  {
    id: 1,
    nome: "André",
    cargo: "Professor"
  },
  {
    id: 2,
    nome: "Cicinho Cabeça",
    cargo: "Aluno"
  }
];

export default function Index() {

  function Item({usuario}) {
    return (
      <View key={usuario.id} style={style.itemLista}>
        <Text style={style.textoLista}>{usuario.nome}</Text>
      </View>
    );
  }

  function Cabecalho() {
    return (
      <Text style={{ fontSize: 30, fontWeight: 'bold', padding: 10, textAlign: 'center' }}>Lista de Usuários</Text>
    )
  }

  function Rodape() {
    return (
      <Text style={{ fontSize: 20 }}>Total de usuários: {usuarios.length}</Text>
    )
  }

  return ( 
    <FlatList
      data={usuarios}
      renderItem={ ({item}) => <Item usuario={item}/> }
      ListHeaderComponent={ () => <Cabecalho /> }
      ListFooterComponent={ () => <Rodape />}
      style={{ width: '100%' }}
    />
  );
}

const style = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  itemLista: {
    width: '100%',
    padding: 10,
    marginBottom: 2,
    backgroundColor: '#aaaaaa'
  },

  textoLista: { 
    fontSize: 20 
  }

})