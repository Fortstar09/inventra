import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const CustomTabBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add-product")}
      >
        <Plus color="#fff" size={32} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6C63FF",
    position: "absolute",
    bottom: 0,
    transform: [{ translateX: 175}],
    width: "100%",
  },
  fab: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: 50,
    height: 50,
    borderRadius: '100%',
    backgroundColor: "#6C63FF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 0,
    shadowColor: "transparent", // iOS shadow removal
  },
});
