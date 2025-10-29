import { icons } from "@/constants";
import { MotiView } from "moti";
import React from "react";
import { Image, Text, View } from "react-native";

type ToastProps = { showToast: boolean; text: string; error?: boolean };

const Toast = ({ showToast, text, error }: ToastProps) => {
  return (
    <MotiView
      from={{ translateY: -100, opacity: 0 }}
      animate={{
        translateY: showToast ? 0 : -100,
        opacity: showToast ? 1 : 0,
      }}
      transition={{
        type: "timing",
        duration: 300,
        delay: showToast ? 0 : 200,
      }}
      className="absolute z-10 top-[25px] right-1/3"
    >
      <View
        className={`${
          error ? "bg-[#F6D4D2]" : "bg-[#CFEAD8]"
        } px-[24px] py-[10px] justify-center flex-row items-center rounded-[40px]`}
      >
        <Text
          className={`${
            error ? "text-[#D42620]" : "text-[#0F973D]"
          } text-base font-semibold`}
        >
          {text}
        </Text>
        {error ? (
          <Image
            source={icons.error}
            resizeMode="contain"
            className="w-5 h-5"
          />
        ) : (
          <Image
            source={icons.check}
            resizeMode="contain"
            className="w-5 h-5"
          />
        )}
      </View>
    </MotiView>
  );
};

export default Toast;
