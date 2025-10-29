import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "./global.css";

SplashScreen.preventAutoHideAsync();

  let dbInitialized = false;

// Separate AppLayout component for Stack navigation
const AppLayout = () => {
  return (
    <>
      <StatusBar hidden={false} />
      <Stack
        screenOptions={{
          headerShown: false,
          freezeOnBlur: true,
          animation: 'slide_from_right',
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

  const createDbIfNeeded = async (db: SQLiteDatabase) => {
    if (dbInitialized) return;

    try {
      // Check if table already exists
      const result = await db.getFirstAsync(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='products'"
      );

      if (result) {
        console.log("✅ Database already initialized");
        dbInitialized = true;
        return;
      }

      dbInitialized = true;
      console.log("🔧 Initializing database...");

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
      dbInitialized = false;
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
      <AppLayout />
    </SQLiteProvider>
  );
};

export default RootLayout;