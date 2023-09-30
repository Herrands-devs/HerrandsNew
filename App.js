import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className={`flex-1 justify-center items-center`}>
      <Text className={`text-[30px] font-montserratRegular text-center`}>
        Welcome to Herrand Customer App
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
