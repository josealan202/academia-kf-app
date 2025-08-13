/*import { Text, View, StyleSheet, FlatList } from "react-native";

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

  function Tela({ children }) {
    return (
      <View style={style.centralizado}>
        {children}
      </View>
    );
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
      ListHeaderComponent={ () => <Tela><Cabecalho /></Tela> } // Cabeçalho centralizado
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

  centralizado: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    padding: 20
  }

})*/

import { Text, View, StyleSheet, FlatList, Button } from "react-native";

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

  // Item da lista
  function Item({ usuario }) {
    return (
      <View key={usuario.id} style={style.itemLista}>
        <Text style={style.textoLista}>{usuario.nome}</Text>
      </View>
    );
  }

  // Cabeçalho da lista
  function Cabecalho() {
    return (
      <Text style={{ fontSize: 30, fontWeight: 'bold', padding: 10, textAlign: 'center' }}>Lista de Usuários</Text>
    );
  }

  // Função Tela para centralizar o conteúdo
  function Tela({ children }) {
    return (
      <View style={style.centralizado}>
        {children}
      </View>
    );
  }

  // Rodapé da lista
function Rodape() {
    return (
      <View style={style.rodape}>
        <View style={style.botaoContainer}>
          <View style={style.botao}>
            <Button title="Botão 1" onPress={() => alert('Botão 1 clicado!')} color="gray"/>
            <Image source={{ uri: 'https://example.com/imagem.png' }}>
          </View>
          <View style={style.botao}>
            <Button title="Botão 2" onPress={() => alert('Botão 2 clicado!')} color="gray"/>
          </View>
          <View style={style.botao}>
            <Button title="Botão 3" onPress={() => alert('Botão 3 clicado!')} color="gray"/>
          </View>
        </View>
      </View>
    );
  }

  return ( 
    <FlatList
      data={usuarios}
      renderItem={ ({ item }) => <Item usuario={item} />}
      ListHeaderComponent={ () => <Tela><Cabecalho /></Tela> } // Cabeçalho centralizado
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
    backgroundColor: 'gray',
  },

  textoLista: { 
    fontSize: 20,
  },

  centralizado: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    padding: 20
  },

  rodape: {
    backgroundColor: 'black',
    padding: 20,
    alignItems: 'center'
  },

  botaoContainer: {
    flexDirection: 'row', // Alinha os botões horizontalmente
    justifyContent: 'space-between', // Espaça igualmente os botões
    width: '80%' // Controla a largura dos botões
  },

  // Estilo individual de cada botão
  botao: {
    flex: 1, // Faz os botões ocuparem todo o espaço possível
    marginHorizontal: 5, // Espaço entre os botões
  }

});
