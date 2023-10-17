import React from 'react'
import { Dimensions, Image, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { iconsPack } from '../../../components/icons'
import { colors } from '../../../../themes/colors'
import { PhoneNumberInput, PrimaryInput } from '../../../components/common/Inputs'
import { SquareButton } from '../../../components/common/Button'
const { width, height } = Dimensions.get("window");

const LoginScreen = ({navigation}) => {
   const {angleLeft,webIcon,switchIcon,logoutIcon,supportIcon ,angleRight} = iconsPack()
   return (
      <SafeAreaView>
          <View  className="p-6 font-montserratRegular flex flex-row items-center gap-5">
            <TouchableOpacity onPress={() => navigation.goBack()}><Image source={angleLeft} /></TouchableOpacity>
         </View>
         <View className="p-6 w-full">
            <Text className="font-montserratBold font-extrabold text-[24px] mb-6 line-clamp-[43px]">Welcome Back !</Text>
            <Text 
               style={{color : colors.primaryColor}} 
               className=""
            >
               Please enter your registered phone number
            </Text>
            <View className="flex w-full items-center  h-[150px] justify-between">
               <PhoneNumberInput 
                  style={"w-full"}
                  placeHolder={"Enter Mobile Number"}
                  type={'phone-pad'}
               />
               <SquareButton 
                  text="Sign In" 
                  styles={{backgroundColor : colors.primaryColor , width : '100%'}} 
                  onPress={() => navigation.navigate("HomeScreen")}
               />
            </View>
            <View className={`items-center`} style={{ height: height * 0.35 }}>
               <View className={`flex-row items-center mt-[18px] space-x-1`}>
                 <Text className={`text-[14px] font-montserratSemiBold text-subTitle`}>
                   Don't have an account?
                 </Text>
                 <TouchableOpacity>
                   <Text
                     className={`text-[14px] font-montserratSemiBold text-primaryColor`}
                     onPress={() => navigation.navigate("SignUpScreen")}
                   >
                     Sign up
                   </Text>
                 </TouchableOpacity>
               </View>
            </View>
         </View>
      </SafeAreaView>
   )
}

export default LoginScreen
