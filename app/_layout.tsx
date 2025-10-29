// import GlobalProvider from "@/context/GlobalProvider";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import {
  SQLiteProvider,
  type SQLiteDatabase
} from "expo-sqlite";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "./global.css";

const RootLayout = () => {
  // Prevent the splash screen from auto-hiding before asset loading is complete.
  SplashScreen.preventAutoHideAsync();

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

  const createDbIfNeeded = async (db: SQLiteDatabase) => {
    await db.execAsync(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    quantity TEXT NOT NULL,
    price TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT,
    createdAt TEXT NOT NULL
  );
`);
  };

  return (
    <SQLiteProvider databaseName="inventra.db" onInit={createDbIfNeeded}>
      <StatusBar hidden={false} />
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="add-product" options={{ headerShown: false }} />
        <Stack.Screen name="products" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
    // </GlobalProvider>
  );
};

export default RootLayout;
