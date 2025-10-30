import ProductList from "@/components/ProductList";
import StatusBar from "@/components/StatusBar";
import { icons } from "@/constants";
import { initDb } from "@/lib/database";
import { router } from "expo-router";
// import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Products = () => {
  const [data, setData] = useState<ProductsProps[]>([]);

  useEffect(() => {
    // Fetch products from the database and set state
    const fetchProducts = async () => {
      try {
        const db = await initDb();
        const results = await db.getAllAsync<ProductsProps>(
          "SELECT * FROM products ORDER BY createdAt DESC LIMIT 50"
        );
        if (results) {
          console.log("Fetched products:", results);
          setData(results);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [data.length]);

  const handleDelete = async (id: string) => {
    try {
      const db = await initDb();

      await db.runAsync("DELETE FROM products WHERE id = ?;", [id]);
      // Update state directly instead of refetching
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar title="Products" />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 100,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/product/[id]",
                params: { id: item.id },
              })
            }
          >
            <ProductList
              id={item.id}
              name={item.name}
              price={item.price}
              qty={item.quantity}
              image={item.image}
              handleDelete={() => handleDelete(item.id)}
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center my-16">
            <Image
              source={icons.shop}
              className="w-7 h-7 mb-3"
              resizeMode="contain"
            />
            <Text className="text-gray-500 text-base">
              No products added yet
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Products;
