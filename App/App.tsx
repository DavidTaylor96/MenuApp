import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useSocketStore from "./store";
import { menuData } from "./data/menu";
import { MenuItem } from "../types/menu";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  },
  menuItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  basket: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  }, 
  basketList: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  remove: {
    padding: 5, 
    backgroundColor: 'red',
  }
});


export default function App() {
  const data = useSocketStore((state) => state.data);
  const basket = useSocketStore((state) => state.basket);
  const addToBasket = useSocketStore((state) => state.addToBasket);
  const sendData = useSocketStore((state) => state.sendData);
  const removeItem = useSocketStore((state) => state.removeFromBasket);

  const handleMenuItemClick = (item: MenuItem) => {
    addToBasket(item);
    sendData(`Added Item: ${item.name} to the basket`);
  };


  return (
    <View style={styles.container}>
      <View style={styles.basket}>
        <Text style={styles.categoryHeader}>Basket</Text>
        {basket.map((item, index) => (
          <View style={styles.basketList}>
          <Text key={index}>{item.name}</Text>
          <TouchableOpacity style={styles.remove} onPress={() => removeItem(item)}>
            <Text>x</Text>
          </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        {menuData.menu.map((category, index) => (
          <View key={index}>
            <Text style={styles.categoryHeader}>{category.category}</Text>
            {category.items.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.menuItem}
                onPress={() => handleMenuItemClick(item)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

