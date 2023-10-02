import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  DisabledRoundedBtn,
  DisabledSquareBtn,
  RoundedButton,
  SquareButton,
} from "./screens/components/common/Button";
import { colors } from "./themes/colors";
import Sidebar from "./screens/components/customer-home-screen/Sidebar";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function loadCustomFonts() {
      await Font.loadAsync({
        MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
        MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
      });
      setFontLoaded(true);
    }

    loadCustomFonts();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <View className={`flex-1 justify-center items-center`}>
      <Text className={`text-[30px] font-montserratRegular text-center`}>
        Welcome to Herrand Customer App
      </Text>

      <RoundedButton text={"Open Sidebar"} onPress={toggleSidebar} />
      <SquareButton
        text={"Square Button"}
        styles={{ backgroundColor: "#0066F5" }}
      />
      <SquareButton
        text={"Black Flex Start"}
        styles={{
          backgroundColor: colors.blackBackground,
          justifyContent: "flex-start",
        }}
      />
      <SquareButton
        text={"Square Green"}
        styles={{
          backgroundColor: colors.green,
        }}
      />
      <SquareButton
        text={"Red Button"}
        styles={{
          backgroundColor: colors.red,
        }}
      />
      <DisabledSquareBtn text={"Square Disabled"} />
      <DisabledRoundedBtn text={"Rounded Disabled"} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </View>
  );
}
