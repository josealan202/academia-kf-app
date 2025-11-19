import { Stack, useRouter, usePathname } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const router = useRouter();

  const pathname = usePathname();

  const hideFooter = pathname === "/" || pathname === "/index";

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["left", "right"]}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "gray" },
            headerTintColor: "white",
            headerTitle: "CT Gladiadores",
          }}
        />
        {!hideFooter && (
          <SafeAreaView style={styles.footer} edges={["bottom"]}>
            <TouchableOpacity onPress={() => router.push("/user")} style={styles.button}>
              <Ionicons name="person" size={24} color="white" />
              <Text style={styles.label}>Usuário</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace("/menu")} style={styles.button}>
              <Ionicons name="home" size={24} color="white" />
              <Text style={styles.label}>Início</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/config")} style={styles.button}>
              <Ionicons name="settings" size={24} color="white" />
              <Text style={styles.label}>Opções</Text>
            </TouchableOpacity>
          </SafeAreaView>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "gray",
    paddingVertical: 10,
  },
  button: {
    alignItems: "center",
  },
  label: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  }
});
