import * as Font from "expo-font";
import { useEffect, useRef, useState } from "react";
import { Animated, Button, ScrollView, Text, View } from "react-native";
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
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SpinSplash" component={SpinSplash} />
          <Stack.Screen name="Swapper" component={Swapper} />
          <Stack.Screen name="AgentScreen" component={HomeScreen} />
          <Stack.Screen name="VideoChoice" component={VideoChoice} />
          <Stack.Screen
            name="CreateAccountCustomer"
            component={CreateAccount}
          />
          <Stack.Screen name="SignInPhone" component={SignInPhone} />
          <Stack.Screen name="SignInEmail" component={SignInEmail} />
          <Stack.Screen name="OneMoreStep" component={OneMoreStep} />
          <Stack.Screen name="EnterYourNumber" component={EnterYourNumber} />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
          <Stack.Screen name="CustomerHome" component={CustomerHome} />
          <Stack.Screen
            name="CustomerErrandDetails"
            component={CustomerErrandDetails}
          />
          <Stack.Screen name="CustomerPayments" component={CustomerPayments} />
          <Stack.Screen name="CustomerAddCard" component={CustomerAddCard} />
          <Stack.Screen
            name="CustomerErrandMap"
            component={CustomerErrandMap}
          />
          <Stack.Screen
            name="CustomerVirtualProcess"
            component={CustomerVirtualProcess}
          />

          <Stack.Screen
            name="CustomerManageCard"
            component={CustomerManageCard}
          />
          <Stack.Screen
            name="CustomerCreateErrand"
            component={CustomerCreateErrand}
          />
          <Stack.Screen
            name="CustomerEditProfile"
            component={CustomerEditProfile}
          />
          <Stack.Screen
            name="CustomerDeleteAccount"
            component={CustomerdeleteAccount}
          />
          <Stack.Screen
            name="MyErrandsCustomer"
            component={MyErrandsCustomer}
          />

          {/* Agent Navigation */}
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="Support" component={SupportScreen} />
          <Stack.Screen name="InProgress" component={InProgress} />
          <Stack.Screen name="IsCompleted" component={IsCompleted} />
          <Stack.Screen name="CompleteScreen" component={CompleteScreen} />
          <Stack.Screen name="OtpScreenAgent" component={OtpScreenAgent} />
          {/* Profile */}
          <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}
