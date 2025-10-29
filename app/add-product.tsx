import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import StatusBar from "@/components/StatusBar";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Camera, Images, Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddProduct = () => {
  const { id } = useLocalSearchParams();
  const database = useSQLiteContext();
  const [productDetails, setProductDetails] = useState<{
    image1: ImagePicker.ImagePickerAsset | null;
    name: string;
    quantity: string;
    price: string;
    cat: string;
  }>({
    image1: null,
    name: "",
    quantity: "",
    price: "",
    cat: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setEdit(true);
      // Fetch product details from the database using the id
      const fetchProductDetails = async () => {
        try {
          const results = await database.getAllAsync<any>(
            "SELECT * FROM products WHERE id = ?",
            [parseInt(id as string)]
          );
          if (results && results.length > 0) {
            const product = results[0];
            setProductDetails({
              image1: product.image
                ? { uri: product.image, width: 0, height: 0, type: "image" }
                : null,
              name: product.name,
              quantity: product.quantity,
              price: product.price,
              cat: product.category,
            });
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };
      fetchProductDetails();
    }
  }, [id]);

  const handleChange = (field: string, value: string) => {
    setProductDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const permanentImagePath = productDetails.image1
        ? await saveImagePermanently(productDetails.image1.uri)
        : null;
      await database.runAsync(
        `UPDATE products SET name = ?, quantity = ?, price = ?, category = ?, image = ? WHERE id = ?`,
        [
          productDetails.name.trim(),
          productDetails.quantity.trim(),
          productDetails.price.trim(),
          productDetails.cat.trim(),
          permanentImagePath,
          id,
        ]
      );
      Alert.alert("Success", "Product updated successfully!");
      setLoading(false);
      router.back();
    } catch (error) {
      console.error("Error updating product:", error);
      Alert.alert("Error", "Failed to update product");
      setLoading(false);
    } finally {
      setLoading(false);

      setProductDetails({
        image1: null,
        name: "",
        quantity: "",
        price: "",
        cat: "",
      });
    }
  };

  const openCamera = async (img: "image1") => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setProductDetails({
        ...productDetails,
        [img]: result.assets[0],
      });
    } else {
      setTimeout(() => {
        Alert.alert("Image picked", "You did not take any image");
      }, 100);
    }
  };

  const openPicker = async (img: "image1") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProductDetails({
        ...productDetails,
        [img]: result.assets[0],
      });
    } else {
      setTimeout(() => {
        Alert.alert("Image picked", "You did not select any image");
      }, 100);
    }
  };

  const saveImagePermanently = async (uri: any) => {
    try {
      const filename = uri.split("/").pop();
      const newPath = `${FileSystem.documentDirectory}${filename}`;
      await FileSystem.copyAsync({ from: uri, to: newPath });
      return newPath;
    } catch (error) {
      console.error("Error saving image permanently:", error);
      return uri;
    }
  };

  const handleContinue = async () => {
    if (
      !productDetails.image1 ||
      productDetails.name.trim() === "" ||
      productDetails.quantity.trim() === "" ||
      productDetails.price.trim() === "" ||
      productDetails.cat.trim() === ""
    ) {
      return Alert.alert("Please provide all fields");
    }

    try {
      setLoading(true);
      const permanentImagePath = await saveImagePermanently(
        productDetails.image1.uri
      );

      const newProduct = {
        id: Date.now().toString(),
        name: productDetails.name.trim(),
        quantity: productDetails.quantity.trim(),
        price: productDetails.price.trim(),
        category: productDetails.cat.trim(),
        image: permanentImagePath,
        createdAt: new Date().toISOString(),
      };

      await database.runAsync(
        `INSERT INTO products (id, name, quantity, price, category, image, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          newProduct.id,
          newProduct.name,
          newProduct.quantity,
          newProduct.price,
          newProduct.category,
          newProduct.image,
          newProduct.createdAt,
        ]
      );

      Alert.alert("Let's gooo", "Product saved successfully!");
      setLoading(false);
      router.back();
    } catch (error) {
      console.error("Error saving product:", error);
      Alert.alert("Oh no!", "Failed to save product");
      setLoading(false);
    } finally {
      setLoading(false);
      setProductDetails({
        image1: null,
        name: "",
        quantity: "",
        price: "",
        cat: "",
      });
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="bg-white flex-1">
          <StatusBar title="Add Product" action={() => router.back()} />
          <ScrollView className="pt-7">
            <View className="mx-6">
              <Text className="text-gray-500 text-base font-brimedium mb-4">
                Upload product infomation
              </Text>

              <View className="flex-row justify-between items-center mb-6">
                <TouchableOpacity
                  className="bg-gray-100 rounded-xl w-[172.5px] h-[180px] justify-center items-center"
                  onPress={() => setIsModalVisible(true)}
                >
                  {productDetails.image1 ? (
                    <Image
                      source={{ uri: productDetails.image1.uri }}
                      resizeMode="cover"
                      className="w-[172.5px] h-[194px] rounded-xl"
                    />
                  ) : (
                    <ImageCard />
                  )}
                </TouchableOpacity>
              </View>

              <View className="gap-3 py-2 px-3 min-h-[46px] flex-row items-center rounded-lg bg-primary-100">
                <Camera color="#6C63FF" strokeWidth={1.5} size={20} />
                <Text className="text-sm font-brismedium text-primary-200">
                  Make sure the image is clear and well lit
                </Text>
              </View>
            </View>

            <View className="mx-6 mt-8">
              <CustomInput
                label="Product name"
                placeholder="e.g., Samsung Galaxy S24 Ultra, Cornflakes"
                value={productDetails.name}
                changeText={(text) => handleChange("name", text)}
              />
              <CustomInput
                label="Quantity Available"
                placeholder="0"
                value={productDetails.quantity}
                num
                changeText={(text) => handleChange("quantity", text)}
              />
              <CustomInput
                label="Add Price (per unit)"
                placeholder="Price per unit in naira (e.g., ₦1500)"
                value={productDetails.price}
                num
                changeText={(text) => handleChange("price", text)}
              />
              <CustomInput
                label="Add Category"
                placeholder="e.g., Electronics, Groceries"
                value={productDetails.cat}
                changeText={(text) => handleChange("cat", text)}
              />
            </View>

            <View className="mx-6">
              <CustomButton
                title={edit ? "Update Product" : "Add Product"}
                handlePress={edit ? handleUpdate :  handleContinue}
                containerStyles="mt-[30px] mb-[100px] w-full"
                isLoading={loading}
              />
            </View>
          </ScrollView>
        </View>

        {/* Modal for Camera/File Picker */}
        <Modal
          visible={isModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/40">
            <View className="bg-white p-6 rounded-2xl w-72">
              <Text className="text-lg font-brimedium mb-4 text-center">
                Choose Image Source
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  openCamera("image1");
                }}
                className="bg-primary-100 flex-row gap-3 items-center justify-center py-3 rounded-lg mb-3"
              >
                <Camera color="#3F3D56" strokeWidth={1.55} size={20} />
                <Text className="text-center text-primary-200 font-brimedium">
                  Use Camera
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  openPicker("image1");
                }}
                className="bg-primary-100 flex-row gap-3 items-center justify-center py-3 rounded-lg mb-3"
              >
                <Images color="#3F3D56" strokeWidth={1.55} size={20} />
                <Text className="text-center text-primary-200 font-brimedium">
                  Upload from Files
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                className="bg-gray-100 flex-row gap-3 items-center justify-center py-3 rounded-lg"
              >
                <Text className="text-center text-gray-700 font-brimedium">
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddProduct;

const ImageCard = () => {
  return (
    <View className="size-8 bg-white rounded-full justify-center items-center">
      <Plus color="#2E7D32" strokeWidth={1.5} size={20} />
    </View>
  );
};
