import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";


const StatusBar = ({
  title,
  action,
}: {
  title: string;
  action?: () => void;
}) => {
  return (
    <View className="pt-5 px-4 py-3 flex flex-row items-center justify-between border-b border-[#EEEEEE]">
      <TouchableOpacity
        onPress={action ? action : () => router.back()}
        className="size-10 bg-white rounded-full border border-gray-100 flex items-center justify-center"
      >
        <ArrowLeft color="#18181B" size={20} />
      </TouchableOpacity>
      <View className="mx-4">
        <Text className="text-xl font-brimedium  text-gray-600">
          {title}
        </Text>
      </View>
      <View className="size-10 bg-white" />
    </View>
  );
};

export default StatusBar;
