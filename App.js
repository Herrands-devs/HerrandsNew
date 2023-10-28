import * as Font from "expo-font";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Button,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import {
  DisabledRoundedBtn,
  DisabledSquareBtn,
  RoundedButton,
  SquareButton,
} from "./screens/components/common/Button";
import { colors } from "./themes/colors";
//Navigation import
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Agent/screens/HomeScreen";
import SpinSplash from "./screens/components/onboarding/SpinSplash";
import Swapper from "./screens/components/onboarding/swapper/Swapper";
import VideoChoice from "./screens/components/onboarding/VideoChoice";
import CreateAccount from "./screens/customer/Auth/CreateAccount";
import OneMoreStep from "./screens/customer/Auth/OneMoreStep";
import EnterYourNumber from "./screens/customer/Auth/EnterYourNumber";
import SupportScreen from "./screens/Agent/screens/SupportScreen";
import OtpScreen from "./screens/customer/Auth/OtpScreen";
import CustomerHome from "./screens/customer/Main/CustomerHome";
import SignInPhone from "./screens/customer/Auth/SignInPhone";
import SignInEmail from "./screens/customer/Auth/SignInEmail";
import AuthScreen from "./screens/Agent/screens/AuthScreen";
import LoginScreen from "./screens/Agent/screens/Auth/LoginScreen";
import SignUpScreen from "./screens/Agent/screens/Auth/SignUpScreen";
import CustomerEditProfile from "./screens/customer/Main/CustomerEditProfile";
import CustomerdeleteAccount from "./screens/customer/Main/CustomerdeleteAccount";
import MyErrandsCustomer from "./screens/customer/Main/MyErrandsCustomer";
import CustomerErrandDetails from "./screens/customer/Main/CustomerErrandDetails";
import CustomerPayments from "./screens/customer/Main/CustomerPaymnets";
import CustomerAddCard from "./screens/customer/Main/CustomerAddCard";
import { GlobalProvider } from "./context/context.store";
import CustomerManageCard from "./screens/customer/Main/CustomerManageCard";
import CustomerCreateErrand from "./screens/customer/Main/CustomerCreateErrand";
import CompleteScreen from "./screens/Agent/screens/Auth/CompleteScreen";
import OtpScreenAgent from "./screens/Agent/screens/Auth/OtpScreenAgent";
import EditProfile from "./screens/Agent/screens/Profile/EditProfile";
import InProgress from "./screens/Agent/screens/Errands/InProgress";
import IsCompleted from "./screens/Agent/screens/Errands/isCompleted";
import CustomerErrandMap from "./screens/customer/Main/CustomerErrandMap";
import CustomerVirtualProcess from "./screens/customer/Main/CustomerVirtualProcess";
import ErandCompleteRate from "./screens/customer/Main/ErandCompleteRate";
import ThankYou from "./screens/customer/Main/ThankYou";
import PaymentSuccess from "./screens/customer/Main/PaymentSuccess";
import Navigation from "./Navigation";

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
      {/* <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="AgentScreen" component={HomeScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="Support" component={SupportScreen} />
          <Stack.Screen name="InProgress" component={InProgress} />
          <Stack.Screen name="IsCompleted" component={IsCompleted} />
          <Stack.Screen name="CompleteScreen" component={CompleteScreen} />
          <Stack.Screen name="OtpScreenAgent" component={OtpScreenAgent} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
      </NavigationContainer> */}
      <Navigation />
    </GlobalProvider>
  );
}
