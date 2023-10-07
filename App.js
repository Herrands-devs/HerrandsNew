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
import {
  OtpInputs,
  PhoneNumberInput,
  PrimaryInput,
} from "./screens/components/common/Inputs";
import { DropDownPicker } from "./screens/components/common/Dropdown";
import HomeScreen from "./screens/Agent/screens/HomeScreen";
import Sidebar from "./screens/components/customer-home-screen/Sidebar";
import Notification from "./screens/components/common/Notification";
import EmptyComponent from "./screens/components/common/EmptyComponent";
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
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SpinSplash" component={SpinSplash} />
        <Stack.Screen name="Swapper" component={Swapper} />
        <Stack.Screen name="ButtonComp" component={ButtonComp} />
        <Stack.Screen name="InputComp" component={InputComp} />
        <Stack.Screen name="AgentScreen" component={HomeScreen} />
        <Stack.Screen name="VideoChoice" component={VideoChoice} />
        <Stack.Screen name="CreateAccountCustomer" component={CreateAccount} />
        <Stack.Screen name="SignInPhone" component={SignInPhone} />
        <Stack.Screen name="SignInEmail" component={SignInEmail} />
        <Stack.Screen name="OneMoreStep" component={OneMoreStep} />
        <Stack.Screen name="EnterYourNumber" component={EnterYourNumber} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="CustomerHome" component={CustomerHome} />


        {/* Agent Navigation */}
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen
          name="CustomerEditProfile"
          component={CustomerEditProfile}
        />
        <Stack.Screen
          name="CustomerDeleteAccount"
          component={CustomerdeleteAccount}
        />
        <Stack.Screen name="MyErrandsCustomer" component={MyErrandsCustomer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const ButtonComp = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [opacityValue]);

  const screenOpacity = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const showDialog = () => {
    setModalOpen(true);
  };

  const hideDialog = () => {
    setModalOpen(false);
  };

  return (
    <ScrollView>
      <View className={`flex-1 justify-center items-center`}>
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
          onPress={() => props.navigation.navigate("SpinSplash")}
        />
        <DisabledSquareBtn text={"Square Disabled"} />
        <DisabledRoundedBtn text={"Rounded Disabled"} />
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <Button
          title="Go to Inputs"
          onPress={() => props.navigation.navigate("InputComp")}
        />
        <Button
          title="Go to Agent Dashbaord"
          onPress={() => props.navigation.replace("AgentScreen")}
        />
        <RoundedButton text={"Open Modal"} onPress={showDialog} />
        <EmptyComponent message={"There are no items here yet."} />
        <Notification
          isVisible={modalOpen}
          onClose={hideDialog}
          title="You need a Dialog?"
          subTitle={
            "By clicking proceed it means you are on your way to deliver"
          }
          btnBackground={colors.primaryColor}
          image={require("./assets/gifs/question.gif")}
        />
      </View>
    </ScrollView>
  );
};

const InputComp = (props) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadCustomFonts() {
      await Font.loadAsync({
        MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
      });
      setFontLoaded(true);
    }

    loadCustomFonts();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <View className={`flex-1 justify-center items-center`}>
      <PrimaryInput
        label={"Active Input"}
        style="w-full"
        placeHolder={"Enter Placeholder"}
      />
      <PrimaryInput
        value={"Disabled"}
        label={"Disabled Input"}
        style="w-full"
        placeHolder={"Enter Placeholder"}
        disabled="true"
      />
      <PhoneNumberInput
        iconName={"mail-sharp"}
        iconSize={"15"}
        label={"Enter Label"}
        style="w-full h-[45px]"
        placeHolder={"Enter Placeholder"}
      />
      <DropDownPicker
        placeHolder={"Search"}
        label={"Enter Drop Label"}
        defaultOption={"Within Lagos"}
        options={[
          { label: "Within Ogun", value: "" },
          { label: "Within Abuja", value: "" },
          { label: "Within Ogun", value: "" },
          { label: "Within Abuja", value: "" },
          { label: "Within Ogun", value: "" },
          { label: "Within Abuja", value: "" },
          { label: "Within Ogun", value: "" },
          { label: "Within Abuja", value: "" },
        ]}
      />

      <OtpInputs />
      <Button
        title="Go to Buttons"
        onPress={() => props.navigation.navigate("ButtonComp")}
      />
    </View>
  );
};
