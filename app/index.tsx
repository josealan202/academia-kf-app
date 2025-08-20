import { Text, View, StyleSheet, FlatList, Button } from "react-native";
import { Link } from "expo-router";

/*const usuarios = [
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
];*/

export default function Index() {

  // Item da lista
  /*function Item({ usuario }) {
    return (
      <View key={usuario.id} style={style.itemLista}>
        <Text style={style.textoLista}>{usuario.nome}</Text>
      </View>
    );
  }*/

  // Cabeçalho da lista
  function Cabecalho() {
    return (
      <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10, textAlign: 'left', color: 'white' }}>Gerenciamento de turmas</Text>
    );
  }

  // Função Tela para centralizar o conteúdo
  function Tela() {
    return (
      <View style={style.botaoContainerTela}>
        <View style={style.botaoTela}>
          <Link href="/Turmas" asChild>
            <Button title="Turmas" color="gray"/>
          </Link>
        </View>
        <View style={style.botaoTela}>
          <Link href="/Planos" asChild>
            <Button title="Planos" color="gray"/>
          </Link>
        </View>
        <View style={style.botaoTela}>
          <Link href="/Pagamentos" asChild>
            <Button title="Pagamentos" color="gray"/>
          </Link>
        </View>
        <View style={style.botaoTela}>
          <Link href="/Checkins" asChild>
            <Button title="Check-ins" color="gray"/>
          </Link>
        </View>       
      </View>
    );
  }

  // Rodapé da lista
  function Rodape() {
    return (
      <View style={style.rodape}>
        <View style={style.botaoContainer}>
            <View style={style.botao}>
              <Link href="/user" asChild>
                <Button title="👤" color="black"/>
              </Link>
            </View>
          <View style={style.botao}>
            <Link href="/" asChild>
              <Button title="🏠" color="black"/>
            </Link>
          </View>
          <View style={style.botao}>
              <Link href="/config" asChild>
                <Button title="⚙" color="black"/>
              </Link>
          </View>
        </View>
      </View>
    );
  }

  return ( 
    <View style={style.containerP}>
      <FlatList
        //data={usuarios}
        //renderItem={({ item }) => <Item usuario={item} />}
        ListHeaderComponent={() => <Tela> <Cabecalho /></Tela>}
        style={{ width: '100%' }}
      />
      <Rodape />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  containerP: {
    flex: 1,
    backgroundColor: 'black'
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
    padding: 20,
  },

  rodape: {
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
    paddingBottom: 60
  },

  botaoContainer: {
    flexDirection: 'row', // Alinha os botões horizontalmente
    justifyContent: 'space-between', // Espaça igualmente os botões
    width: '80%', // Controla a largura dos botões
  },

  botaoContainerTela: {
    flexDirection: 'column', // Alinha os botões horizontalmente
    justifyContent: 'center',
    alignItems: 'center', // Centraliza os itens no eixo horizontal
    paddingTop: 200
  },

  botaoTela: {
    flex: 1, // Faz os botões ocuparem todo o espaço possível
    marginBottom: 25, // Espaço entre os botões
    
  },

  // Estilo individual de cada botão
  botao: {
    flex: 1, // Faz os botões ocuparem todo o espaço possível
    marginHorizontal: 5, // Espaço entre os botões
  }

});
