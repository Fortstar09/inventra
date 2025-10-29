import { Eye, EyeClosed } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

// import { icons } from "../constants";

interface FormFieldProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "name-phone-pad"
    | "decimal-pad"
    | "twitter"
    | "web-search";
}

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-x-2 ${otherStyles}`}>
      <Text className="text-base text-black-100 font-medium mb-2">{title}</Text>
      <View className="w-full h-[56px] px-4 rounded-lg border border-gray-100 focus:border-gray-200 flex flex-row items-center">
        <TextInput
          className="flex-1  text-black font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#000000"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {!showPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
