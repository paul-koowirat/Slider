import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Setup from "./Setup";

export default function App() {
  return (
    <View style={styles.container}>
      <Setup />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
