import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{
        headerStyle: { backgroundColor: 'gray' },
        headerTintColor: "white" // Cor de fundo para todas as telas
      }}>
      <Stack.Screen 
        name="index"
        options={{ title: "Academia Gladiadores" }}
      />
    </Stack>
  );
}
