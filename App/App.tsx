import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useSocketStore from "./store";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginTop: 20,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  text: {
    textAlign: "center",
    color: "white",
  }
});

export default function App() {
  const data = useSocketStore((state) => state.data);
  const sendData = useSocketStore((state) => state.sendData);

  const handleData = () => sendData("Hello from client!");

  return (
    <View style={styles.container}>
      <Text>{data || "Waiting for data..."}</Text>
      <TouchableOpacity onPress={handleData} style={styles.button}>
        <Text style={styles.text}>Send data</Text>
      </TouchableOpacity>
    </View>
  );
}
