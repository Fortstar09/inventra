import order from "@/assets/icons/order.png";
import store from "@/assets/icons/store.png";
import CustomTabBar from "@/components/CustomTabBar";
import ProductList from "@/components/ProductList";
import { icons } from "@/constants";
import { router, useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const features = [
  { icon: store, text: "Add Products" },
  { icon: order, text: "View Products" },
  { icon: store, text: "Edit Products" },
];

const Home = () => {
  const [data, setData] = useState<ProductsProps[]>([]);

  const database = useSQLiteContext();

  const fetchProducts = useCallback(async () => {
    try {
      const results = await database.getAllAsync<ProductsProps>(
        "SELECT * FROM products ORDER BY createdAt DESC LIMIT 50"
      );
      if (results) {
        console.log("Fetched products:", results.length);
        setData(results);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [database]); 
  useFocusEffect(
    useCallback(() => {
      fetchProducts();

      return () => {
     
      };
    }, [fetchProducts])
  );

  const handleDelete = async (id: string) => {
    try {
      await database.runAsync("DELETE FROM products WHERE id = ?;", [id]);
      setData(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white py-6 px-5">
      {/* STATIC CONTENT */}
      <View>
        <View className="flex-row gap-3 items-center mt-3 mb-10 ">
          <Image
            source={icons.logo}
            className="size-8 mb-3"
            resizeMode="contain"
          />
          <Text className="text-primary text-3xl font-brisemibold">
            Inventra
          </Text>
        </View>
        <Text className="text-gray-600 text-xl font-brisemibola">
          Hello, there 👋🏼
        </Text>
        <Text className="text-gray-500 text-base font-briregular my-2">
          Your ultimate inventory management solution at your fingertips.
        </Text>

        <View className="bg-primary p-5 rounded-lg mt-3 gap-4">
          <View className="flex-row justify-between w-full  items-start">
            <Text className="text-lg text-white font-briregular">
              Total Items
            </Text>
          </View>
          <View className="flex-row justify-between w-full items-start">
            <View className="size-5" />
            <Text className="text-5xl font-bribold text-white">
              0{data.length}
            </Text>
          </View>
        </View>

        <View className="my-8">
          <Text className="text-gray-700 text-lg font-briregular  mb-5">
            Inventra features
          </Text>
          <View className="flex-row items-center justify-between">
            {features.map((item) => (
              <View
                key={item.text}
                className="justify-center items-center gap-1"
              >
                <Image
                  source={item.icon}
                  className="size-[45px]"
                  resizeMode="contain"
                />
                <Text className="text-gray-500 font-briregular text-sm mt-2">
                  {item.text}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-gray-700 text-lg font-briregular">
            Recent Products
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/products");
            }}
          >
            <Text className="text-primary underline text-lg font-briregular">
              view all
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/product/[id]",
                params: { id: item.id },
              });
            }}
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
          <View className="flex-1 items-center justify-center my-14">
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
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        style={{ flex: 1 }} // 👈 This ensures only the FlatList scrolls
      />

      <CustomTabBar />
    </SafeAreaView>
  );
};

export default Home;
