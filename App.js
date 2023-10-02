import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import {
  DisabledRoundedBtn,
  DisabledSquareBtn,
  RoundedButton,
  SquareButton,
} from "./screens/components/common/Button";
import { colors } from "./themes/colors";
//Navigation import
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { OtpInputs, PhoneNumberInput, PrimaryInput } from "./screens/components/common/Inputs";
import { DropDownPicker } from "./screens/components/common/Dropdown";
import HomeScreen from "./screens/Agent/screens/HomeScreen";



export default function App() {
//const
const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen  name="ButtonComp" component={ButtonComp} />
        <Stack.Screen name="InputComp" component={InputComp} />
        <Stack.Screen name="AgentScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const ButtonComp = (props) => {
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
      <Text className={`text-[30px] font-montserratRegular text-center`}>
        Welcome to Herrand Customer App
      </Text>

      <RoundedButton text={"Rounded Button"} />
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

        <Button  
          title="Go to Inputs"  
          onPress={() => props.navigation.navigate('InputComp')}  
        /> 
        <Button  
          title="Go to Agent Dashbaord"  
          onPress={() => props.navigation.replace('AgentScreen')}  
        /> 
    </View>
  );
}


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
        <PrimaryInput label={"Active Input"} style="w-full" placeHolder={"Enter Placeholder"} />
        <PrimaryInput value={"Disabled"} label={"Disabled Input"} style="w-full" placeHolder={"Enter Placeholder"} disabled="true"/>
        <PhoneNumberInput iconName={"mail-sharp"} iconSize={"15"} label={"Enter Label"} style="w-full h-[45px]" placeHolder={"Enter Placeholder"} />
        <DropDownPicker placeHolder={"Search"} label={"Enter Drop Label"} defaultOption={"Within Lagos"} options={
          [
            {label : 'Within Ogun' , value : ''},
            {label : 'Within Abuja' , value : ''},
            {label : 'Within Ogun' , value : ''},
            {label : 'Within Abuja' , value : ''},
            {label : 'Within Ogun' , value : ''},
            {label : 'Within Abuja' , value : ''},
            {label : 'Within Ogun' , value : ''},
            {label : 'Within Abuja' , value : ''},
          ]
        }/>

        <OtpInputs />
        <Button  
          title="Go to Buttons"  
          onPress={() => props.navigation.navigate('ButtonComp')}  
        /> 
    </View>
  );
}


