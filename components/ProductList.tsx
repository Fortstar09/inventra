import { icons } from "@/constants";
import { formatPriceNaira } from "@/lib/utils";
import { router } from "expo-router";
import { EllipsisVertical, ImageOff } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type ProductListProps = {
  id: string;
  name: string;
  price: number | string;
  qty: number | string;
  image: any;
  handleDelete?: (id: string) => void;
};

const ProductList: React.FC<ProductListProps> = ({
  id,
  name,
  price,
  qty,
  image,
  handleDelete,
}) => {
  const [drop, setDrop] = useState(false);

  return (
    <View className=" py-4 border-b border-gray-100">
      <View className="flex-row  justify-between">
        <View className="flex-row items-center gap-5">
          {image ? (
            <Image
              source={{ uri: image }}
              className="rounded-lg size-20"
              resizeMode="cover"
            />
          ) : (
            <View className="rounded-lg bg-gray-200 size-20 justify-center items-center">
             <ImageOff color="#6C63FF" strokeWidth={2} size={14}  />
            </View>
          )}
          <View className="gap-1">
            <Text className="text-black/70  text-xl font-brimedium capitalize ">
              {name}
            </Text>
            <View className="flex-row items-center">
              <Text className="text-gray-500 text-lg font-brimedium">
                {formatPriceNaira(Number(price))} each
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-gray-500 text-base font-brimedium">
                {qty}{" "}
              </Text>
              <Text className="text-gray-500 text-base font-briregular">
                units available
              </Text>
            </View>
          </View>
        </View>
        <View className="items-end justify-between">
          <TouchableOpacity onPress={() => setDrop(!drop)}>
            <EllipsisVertical color="#71717A" strokeWidth={1.4} size={24} />
          </TouchableOpacity>
        </View>
      </View>
      {drop && (
        <View className="absolute top-12 w-fit h-fit z-10 right-0 px-4 bg-white border-gray-100 border  rounded-xl shadow-lg ">
          <TouchableOpacity
            className="bg-white border-b border-gray-100"
            onPress={() => {
              router.push(`/add-product?id=${id}`);
            }}
          >
            <View className="flex flex-row items-center gap-3 py-3">
              <Image
                source={icons.fileEdit}
                className="size-6"
                resizeMode="contain"
              />
              <Text className="text-base text-gray-500 font-briregular mr-7">
                Edit details
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white"
            onPress={() => {
              if (handleDelete) {
                handleDelete(id);
              }
            }}
          >
            <View className="flex flex-row items-center gap-3 py-3">
              <Image
                source={icons.bin}
                className="size-6"
                resizeMode="contain"
              />
              <Text className="text-base text-[#DC2626] font-briregular mr-7">
                Delete listing
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProductList;
