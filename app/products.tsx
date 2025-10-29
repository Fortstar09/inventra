import ProductList from "@/components/ProductList";
import StatusBar from "@/components/StatusBar";
import { icons } from "@/constants";
import { router, useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Products = () => {
  const [data, setData] = useState<ProductsProps[]>([]);

  const database = useSQLiteContext();

  const fetchProducts = useCallback(async () => {
    try {
      const results = await database.getAllAsync(
        "SELECT * FROM products ORDER BY createdAt DESC"
      );
      if (results) {
        setData((results as ProductsProps[]) || []);
      }
    } catch (error) {
      console.log("DB fetch error:", error);
      setData([]);
    }
  }, [database]);

useFocusEffect(
  useCallback(() => {
    fetchProducts();
    
    return () => {
      // Cleanup
    };
  }, [fetchProducts])
);

 const handleDelete = async (id: string) => {
  try {
    await database.runAsync("DELETE FROM products WHERE id = ?;", [id]);
    // Update state directly instead of refetching
    setData(prev => prev.filter(item => item.id !== id));
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
