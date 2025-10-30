import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "./global.css";

SplashScreen.preventAutoHideAsync();

// Separate AppLayout component for Stack navigation
const AppLayout = () => {
  return (
    <>
      <StatusBar hidden={false} />
      <Stack
        screenOptions={{
          headerShown: false,
          freezeOnBlur: true,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="home"
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="add-product" />
        <Stack.Screen name="products" />
        <Stack.Screen name="product/[id]" />
      </Stack>
    </>
  );
};

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "BricolageGrotesque-Thin": require("../assets/fonts/BricolageGrotesque-ExtraLight.ttf"),
    "BricolageGrotesque-Light": require("../assets/fonts/BricolageGrotesque-Light.ttf"),
    "BricolageGrotesque-Regular": require("../assets/fonts/BricolageGrotesque-Regular.ttf"),
    "BricolageGrotesque-Medium": require("../assets/fonts/BricolageGrotesque-Medium.ttf"),
    "BricolageGrotesque-SemiBold": require("../assets/fonts/BricolageGrotesque-SemiBold.ttf"),
    "BricolageGrotesque-Bold": require("../assets/fonts/BricolageGrotesque-Bold.ttf"),
    "BricolageGrotesque-Black": require("../assets/fonts/BricolageGrotesque-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return <AppLayout />;
};

export default RootLayout;
