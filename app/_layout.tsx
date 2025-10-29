import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "./global.css";

SplashScreen.preventAutoHideAsync();


  let dbInitialized = false;

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

  const createDbIfNeeded = async (db: SQLiteDatabase) => {

    if (dbInitialized) return;
    dbInitialized = true;
    try {
      console.log("🔧 Initializing database...");

      // Add a small delay to ensure native modules are ready
      await new Promise(resolve => setTimeout(resolve, 100));

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

      console.log("✅ Database initialized successfully");
    } catch (error) {
      console.error("❌ Database initialization error:", error);
    }
  };

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

  return (
    <SQLiteProvider databaseName="inventra.db" onInit={createDbIfNeeded}>
      <StatusBar hidden={false} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="add-product" options={{ headerShown: false }} />
        <Stack.Screen name="products" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
};

export default RootLayout;