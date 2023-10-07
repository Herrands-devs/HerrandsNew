import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SquareButton } from "../../components/common/Button";
import { colors } from "../../../themes/colors";

const AuthScreen = ({
   navigation
}) => {
  const firstImage = require("../../../assets/first-bg.png");
  return (
    <ImageBackground source={firstImage}>
      <View
        className={`flex-col justify-end h-[100%] items-center space-y-1 bg-[#000000a9]`}
      >
         <View className={`flex-col items-center bottom-[140px]`}>
          <Text className={`text-white text-[18px] font-montserratBold`}>
          Run Errands at your Convenience
         </Text>
         <Text
            className={`text-white text-[14px] font-montserratRegular max-w-[216px] text-center mt-[8px]`}
          >
            Get paid for your time
          </Text>
         </View>
         <View className="w-full flex justify-between items-center bottom-[120px] h-[100px]">
            <SquareButton 
               text={'Log In'}
               textStyle={{color: 'black'}}
               styles={{ backgroundColor: 'white', width : '90%' }}
               onPress={() => navigation.navigate('LoginScreen')}
            />
            <SquareButton 
               text={'Sign Up'}
               styles={{ backgroundColor: colors.primaryColor , width : '90%'}}
            />
          </View>
      </View>
    </ImageBackground>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
