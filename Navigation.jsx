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
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { GlobalContext } from "./context/context.store";
import SelectAddress from "./screens/customer/Main/SelectAddress";
import AuthScreen from "./screens/Agent/screens/AuthScreen";
import LoginScreen from "./screens/Agent/screens/Auth/LoginScreen";
import SignUpScreen from "./screens/Agent/screens/Auth/SignUpScreen";
import CompleteScreen from "./screens/Agent/screens/Auth/CompleteScreen";
import OtpScreenAgent from "./screens/Agent/screens/Auth/OtpScreenAgent";
import SupportScreen from "./screens/Agent/screens/SupportScreen";
import { InProgress } from "./screens/Agent/screens/components/DashboardComponent";
import IsCompleted from "./screens/Agent/screens/Errands/isCompleted";
import EditProfile from "./screens/Agent/screens/Profile/EditProfile";
import HomeScreen from "./screens/Agent/screens/HomeScreen";
import isEmpty from "./screens/components/isEmpty";
import ChatBoard from "./screens/Agent/screens/components/ChatBoard";
import InProgressBoard from "./screens/Agent/screens/Errands/InProgress";
import ChatsScreen from "./screens/customer/Main/ChatsScreen";
import ChatBoardCustomer from "./screens/customer/Main/ChatBoard";
import { Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

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
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="CompleteScreen" component={CompleteScreen} />
      <Stack.Screen name="OtpScreenAgent" component={OtpScreenAgent} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
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
      <Stack.Screen name="CompleteScreen" component={CompleteScreen} />
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
      <Stack.Screen name="ChatScreen" component={ChatsScreen} />
      <Stack.Screen name="Chat" component={ChatBoardCustomer} />
    </Stack.Navigator>
  );
};

const AgentAuth = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="CompleteScreen" component={CompleteScreen} />
      <Stack.Screen name="OtpScreenAgent" component={OtpScreenAgent} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const Agent = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="InProgress" component={InProgress} />
      <Stack.Screen name="InProgressBoard" component={InProgressBoard} />
      <Stack.Screen name="IsCompleted" component={IsCompleted} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="OtpScreenAgent" component={OtpScreenAgent} />
      <Stack.Screen name="CompleteScreen" component={CompleteScreen} />
      <Stack.Screen name="Chat" component={ChatBoard} />
      <Stack.Screen
        name="CustomerDeleteAccount"
        component={CustomerdeleteAccount}
      />
    </Stack.Navigator>
  );
};

const MainCustomer = () => {
  const navigation = useNavigation()
  const customHeaderBack = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <AntDesign name="arrowleft" size={24} color="black" />
    </TouchableOpacity>
  );
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: '', // Remove the title
        headerBackTitle: '', // Remove the back button title
        headerStyle: {
          borderBottomWidth: 0, // Remove the border
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
        },
        headerLeft: customHeaderBack,
      }}
    >
      {/* <Stack.Screen name="SpinSplash" component={SpinSplash} /> */}
      <Stack.Screen name="CustomerHome" component={CustomerHome}  options={{ headerShown: false, tabBarStyle: { display: "none" } }} />
      <Stack.Screen
        name="CustomerErrandDetails"
        component={CustomerErrandDetails}
      />
      <Stack.Screen name="CustomerPayments" component={CustomerPayments} />
      <Stack.Screen name="CustomerAddCard" component={CustomerAddCard} />
      <Stack.Screen name="CustomerErrandMap" component={CustomerErrandMap} options={{ headerShown: false, tabBarStyle: { display: "none" } }} />
      <Stack.Screen
        name="CustomerVirtualProcess"
        component={CustomerVirtualProcess}
      />

      <Stack.Screen name="CustomerManageCard" component={CustomerManageCard} />
      <Stack.Screen
        name="CustomerCreateErrand"
        component={CustomerCreateErrand}
        options={{
          headerBackImage: () => (
            <AntDesign name="arrowleft" size={24} color="black" />
          ),
        }}
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
      <Stack.Screen name="SelectAddress" component={SelectAddress}  options={{ headerShown: false, tabBarStyle: { display: "none" } }} />
      <Stack.Screen name="ChatScreen" component={ChatsScreen} />
      <Stack.Screen name="Chat" component={ChatBoardCustomer} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const { userType, isNewUser, isOnBoarded, isAuthenticated } =
    useContext(GlobalContext);

  return (
    <NavigationContainer>
      {isNewUser ? (
        <Onboarding />
      ) : isAuthenticated ? (
        <>
          {userType === "Agent" ? (
            <Agent />
          ) : userType === "Customer" ? (
            <MainCustomer />
          ) : null}
        </>
      ) : userType === "Agent" ? (
        <AgentAuth />
      ) : userType === "Customer" ? (
        <Authentication />
      ) : null}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
