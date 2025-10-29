import CustomButton from "@/components/CustomButton";
import StatusBar from "@/components/StatusBar";
import { formatPriceNaira, formatRelativeDate } from "@/lib/utils";
import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Trash2 } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    Image,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const [productDetail, setProductDetail] = useState<ProductsProps | null>(null);
  const [showModal, setShowModal] = useState(false);
  const database = useSQLiteContext();

  useEffect(() => {
    if (id) {
      const fetchProductDetails = async () => {
        try {
          const results = await database.getAllAsync<any>(
            "SELECT * FROM products WHERE id = ?",
            [id as string]
          );
          if (results && results.length > 0) {
            setProductDetail(results[0]);
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };
      fetchProductDetails();
    }
  }, [id, database]);

  const handleDelete = async (id: string) => {
    try {
      await database.runAsync("DELETE FROM products WHERE id = ?;", [id]);
      setShowModal(false);
      router.push("/home");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar title="Product Details" />
      <View className="bg-primary-100 flex-1">
        <ScrollView className="bg-secondary h-full">
          <View className="mx-5 my-6 flex-row items-start justify-between">
            {productDetail?.image ? (
              <Image
                source={{ uri: productDetail.image }}
                className="rounded-xl bg-white"
                style={{ width: "60%", height: 250 }}
                resizeMode="cover"
              />
            ) : (
              <View
                className="rounded-xl bg-white"
                style={{
                  width: "49%",
                  height: 250,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text className="text-white">No Image</Text>
              </View>
            )}
          </View>
          <View className="px-5 items-start gap-2">
            <Text className="text-gray-700 text-3xl font-brisemibold">
              {productDetail?.name}
            </Text>
            <View className="flex-row items-center">
              <Text className="text-gray-500 text-2xl font-brisemibold ">
                {formatPriceNaira(Number(productDetail?.price) || 0)}
              </Text>
            </View>
          </View>

          <View className="my-5 mx-5 px-5 bg-white border border-gray-100 rounded-2xl">
            <View className="flex-row justify-between items-center border-b border-gray-100 py-5">
              <Text className="text-gray-500 text-base font-briregular">
                Quantity Available
              </Text>
              <Text className="text-black text-lg font-brimedium">
                {productDetail?.quantity}
              </Text>
            </View>

            <View className="flex-row justify-between border-b border-gray-100 items-center py-5">
              <Text className="text-gray-500 text-base font-briregular">
                Category
              </Text>
              <View className="py-1 px-2 bg-primary-100 rounded-md">
                <Text className="text-black text-lg font-brimedium">
                  {productDetail?.category}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between border-b border-gray-100 items-center py-5">
              <Text className="text-gray-500 text-base font-briregular">
                Product_Id
              </Text>
              <View className="py-1 px-2 bg-primary-100 rounded-md">
                <Text className="text-black text-lg font-brimedium">
                  {productDetail?.id}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center py-5">
              <Text className="text-gray-500 text-base font-briregular">
                Created At
              </Text>
              <View className="py-1 px-2 bg-primary-100 rounded-md">
                <Text className="text-black text-lg font-brimedium">
                  {formatRelativeDate(productDetail?.createdAt || "")}
                </Text>
              </View>
            </View>
          </View>

          <View className="h-44" />
        </ScrollView>

        {/* Bottom Action Buttons */}
        <View className="absolute bottom-[100px] flex-row justify-center gap-5 items-center mx-5">
          <CustomButton
            title="Edit Product"
            handlePress={() => router.push(`/add-product?id=${id}`)}
            containerStyles="w-full flex-auto"
          />

          <TouchableOpacity
            className="items-center justify-center flex-row min-h-14 py-3 gap-3 rounded-[12px] w-full bg-red-600 flex-auto"
            onPress={() => setShowModal(true)} 
          >
            <Trash2 color="#ffffff" strokeWidth={1.5} size={24} />
            <Text className="text-xl font-brimedium text-white">Delete</Text>
          </TouchableOpacity>
        </View>

        {/* Delete Confirmation Modal */}
        <Modal
          visible={showModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowModal(false)}
        >
          <View className="flex-1 justify-center items-center w-full bg-black/40 px-6">
            <View className="bg-white w-full rounded-2xl p-6">
              <Text className="text-lg font-brimedium text-center mb-4">
                Delete this product?
              </Text>
              <Text className="text-gray-500 text-center mb-6">
                Are you sure you want to delete “{productDetail?.name}”? {"\n"}This
                action cannot be undone.
              </Text>

              <View className="flex-row justify-between mt-6">
                <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 py-3 rounded-xl mr-2"
                >
                  <Text className="text-center text-gray-700 font-brimedium">
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDelete(id as string)}
                  className="flex-1 bg-red-600 py-3 rounded-xl ml-2"
                >
                  <Text className="text-center text-white font-brimedium">
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;
