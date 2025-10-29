import CustomButton from "@/components/CustomButton";
import { icons, images } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="bg-[#F9F9F9] h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="">
          <View className="px-6 absolute z-10 top-20 right-5 items-center flex-row">
            <Image
              source={icons.logo}
              className="w-6 h-6"
              resizeMode="contain"
            />
            <Text className="text-white text-2xl font-bribold ml-2">
              Inventra
            </Text>
          </View>
          <ImageBackground
            source={images.onboard}
            className="w-full h-[500px]"
            resizeMode="cover"
          />

          <LinearGradient
            colors={["transparent", "#F9F9F9"]}
            locations={[0, 0.5]}
            className="-mt-[140px] w-full h-[200px]"
          />
          <View className="-mt-[100px] justify-center items-center px-6">
            <Text className="text-[42px] leading-[150%] text-center font-bribold max-w-[335px] text-black-300">
              <Text className="text-primary/60">Smartly</Text> manage your
              store&apos;s <Text className="text-primary/60">inventory</Text> in
              one <Text className="text-primary/60">one place</Text>
            </Text>
            <Text className="max-w-[342px] text-center text-black-100 text-[16px] leading-[24px] mt-6 font-briregular">
              Capture product images, update stock, and {"\n"}stay organized
              effortlessly.
            </Text>
            <View className="mt-14 w-full justify-center items-center gap-5">
              <CustomButton
                title="Get Started with Inventra"
                handlePress={() => router.push("/home")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
