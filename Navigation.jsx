import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SpinSplash from "./screens/components/onboarding/SpinSplash";
import Swapper from "./screens/components/onboarding/swapper/Swapper";
import VideoChoice from "./screens/components/onboarding/VideoChoice";
import SignInPhone from "./screens/customer/Auth/SignInPhone";
import SignInEmail from "./screens/customer/Auth/SignInEmail";
import OneMoreStep from "./screens/customer/Auth/OneMoreStep";
import EnterYourNumber from "./screens/customer/Auth/EnterYourNumber";
import OtpScreen from "./screens/customer/Auth/OtpScreen";
import CreateAccount from "./screens/customer/Auth/CreateAccount";
import CustomerHome from "./screens/customer/Main/CustomerHome";
import CustomerErrandDetails from "./screens/customer/Main/CustomerErrandDetails";
import CustomerPayments from "./screens/customer/Main/CustomerPaymnets";
import CustomerAddCard from "./screens/customer/Main/CustomerAddCard";
import CustomerErrandMap from "./screens/customer/Main/CustomerErrandMap";
import CustomerVirtualProcess from "./screens/customer/Main/CustomerVirtualProcess";
import CustomerManageCard from "./screens/customer/Main/CustomerManageCard";
import CustomerCreateErrand from "./screens/customer/Main/CustomerCreateErrand";
import ErandCompleteRate from "./screens/customer/Main/ErandCompleteRate";
import ThankYou from "./screens/customer/Main/ThankYou";
import PaymentSuccess from "./screens/customer/Main/PaymentSuccess";
import CustomerEditProfile from "./screens/customer/Main/CustomerEditProfile";
import CustomerdeleteAccount from "./screens/customer/Main/CustomerdeleteAccount";
import MyErrandsCustomer from "./screens/customer/Main/MyErrandsCustomer";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { GlobalContext } from "./context/context.store";
import SelectAddress from "./screens/customer/Main/SelectAddress";

const Stack = createNativeStackNavigator();

const Onboarding = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SpinSplash" component={SpinSplash} />
      <Stack.Screen name="Swapper" component={Swapper} />
      <Stack.Screen name="VideoChoice" component={VideoChoice} />
      <Stack.Screen name="SignInPhone" component={SignInPhone} />
      <Stack.Screen name="SignInEmail" component={SignInEmail} />
      <Stack.Screen name="OneMoreStep" component={OneMoreStep} />
      <Stack.Screen name="EnterYourNumber" component={EnterYourNumber} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="CreateAccountCustomer" component={CreateAccount} />
    </Stack.Navigator>
  );
};

const Authentication = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="SpinSplash" component={SpinSplash} /> */}
      <Stack.Screen name="SignInPhone" component={SignInPhone} />
      <Stack.Screen name="SignInEmail" component={SignInEmail} />
      <Stack.Screen name="OneMoreStep" component={OneMoreStep} />
      <Stack.Screen name="EnterYourNumber" component={EnterYourNumber} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="CreateAccountCustomer" component={CreateAccount} />
    </Stack.Navigator>
  );
};

const MainCustomer = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="SpinSplash" component={SpinSplash} /> */}
      <Stack.Screen name="CustomerHome" component={CustomerHome} />
      <Stack.Screen
        name="CustomerErrandDetails"
        component={CustomerErrandDetails}
      />
      <Stack.Screen name="CustomerPayments" component={CustomerPayments} />
      <Stack.Screen name="CustomerAddCard" component={CustomerAddCard} />
      <Stack.Screen name="CustomerErrandMap" component={CustomerErrandMap} />
      <Stack.Screen
        name="CustomerVirtualProcess"
        component={CustomerVirtualProcess}
      />

      <Stack.Screen name="CustomerManageCard" component={CustomerManageCard} />
      <Stack.Screen
        name="CustomerCreateErrand"
        component={CustomerCreateErrand}
      />

      <Stack.Screen name="ErrandCompleteRate" component={ErandCompleteRate} />
      <Stack.Screen name="ThankYouScreen" component={ThankYou} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
      <Stack.Screen
        name="CustomerEditProfile"
        component={CustomerEditProfile}
      />
      <Stack.Screen
        name="CustomerDeleteAccount"
        component={CustomerdeleteAccount}
      />
      <Stack.Screen name="MyErrandsCustomer" component={MyErrandsCustomer} />
      <Stack.Screen name="SelectAddress" component={SelectAddress} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const { isNewUser, isOnBoarded, isAuthenticated } = useContext(GlobalContext);

  return (
    <NavigationContainer>
      {isNewUser ? (
        <Onboarding />
      ) : isAuthenticated ? (
        <MainCustomer />
      ) : (
        <Authentication />
      )}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
