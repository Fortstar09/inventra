import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  icon?: React.ReactNode;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  icon,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`items-center justify-center flex w-full min-h-14 py-3 rounded-[12px] ${containerStyles } ${
        isLoading ? "bg-primary/70" : "bg-primary"
      }`}
      disabled={isLoading}
    >
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#98A0AD"
          size={24}
          className="mr-2"
        />
      )}
      <Text
        className={`${
          isLoading ? "text-gray-200" : "text-white"
        } text-xl font-brimedium items-center ${textStyles}`}
      >
        {title}
      </Text>
      {icon && !isLoading &&  (
        <TouchableOpacity className="ml-2" disabled={isLoading}>
          {icon}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
