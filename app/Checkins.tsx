//@ts-nocheck
import { View, Text, FlatList, Button, Alert } from "react-native";
import { useEffect, useState } from "react";

export default function Aula() {
  const [alunos, setAlunos] = useState([]);

  const carregarAlunos = async () => {
    const res = await fetch(
      "https://sk3c6h6g-3000.brs.devtunnels.ms/api/aluno/viewAlunoComPlano"
    );
    const json = await res.json();
    setAlunos(json.data);
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  const marcarPresenca = async (id_usuario) => {
    try {
      const res = await fetch(
        "https://sk3c6h6g-3000.brs.devtunnels.ms/api/checkin/useCheckin",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_usuario }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Erro", data.error);
        return;
      }

      Alert.alert(
        "Presença marcada",
        `Check-ins restantes: ${data.checkins_restantes}`
      );

      carregarAlunos();
    } catch {
      Alert.alert("Erro", "Falha ao marcar presença");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "black" }}>
      <Text
        style={{
          color: "white",
          fontSize: 22,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Aula de hoje
      </Text>

      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: "#444",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>
              {item.nome}
            </Text>
            <Text style={{ color: "gray" }}>
              Check-ins: {item.checkins}
            </Text>

            <Button
              title="Marcar presença"
              disabled={item.checkins <= 0}
              onPress={() => marcarPresenca(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}
