import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Config() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Tela de Configuração</Text>
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}