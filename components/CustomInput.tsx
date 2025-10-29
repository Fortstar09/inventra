import React from "react";
import { Text, TextInput, View } from "react-native";

const CustomInput = ({
  label,
  placeholder,
  num,
  textarea,
  value,
  changeText,
}: {
  label?: string;
  placeholder: string;
  textarea?: boolean;
  icon?: boolean;
  num?: boolean;
  value?: string;
  changeText?: (text: string) => void;
}) => {
  return (
    <View className="mb-6">
      <Text className="text-base text-gray-700 font-brimedium mb-2">
        {label}
      </Text>
      <View className="px-2 py-2 border-b border-gray-200 flex flex-row items-center">
        <TextInput
          className="text-base text-black w-full font-briregular "
          placeholder={placeholder}
          placeholderTextColor="#A1A1AA"
          multiline={textarea}
          maxLength={textarea ? 140 : undefined}
          keyboardType={num ? "numeric" : "default"}
          value={value}
          onChangeText={changeText}
        />
      </View>
    </View>
  );
};

export default CustomInput;
