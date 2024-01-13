import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";

//Navigation import
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Navigation from "./Navigation";
import { GlobalProvider } from "./context/context.store";
import store from "./store";
import { Provider } from "react-redux";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    async function loadCustomFonts() {
      await Font.loadAsync({
        MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
        MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
        MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
        MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
      });
      setFontLoaded(true);
    }

    loadCustomFonts();
  }, []);

  if (!fontLoaded) {
    return null;
  }
  return (
    <GlobalProvider>
      <StatusBar
        hidden={false}
        backgroundColor="#0066F5"
        barStyle="light-content"
      />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </GlobalProvider>
  );
}
