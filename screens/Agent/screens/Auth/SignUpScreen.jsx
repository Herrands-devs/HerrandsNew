import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { iconsPack } from '../../../components/icons'
import { colors } from '../../../../themes/colors'
import { CheckBox, PhoneNumberInput, PrimaryInput } from '../../../components/common/Inputs'
import { SquareButton } from '../../../components/common/Button'
import { DropDownPicker } from '../../../components/common/Dropdown'
import KeyboardAvoidingContainer from '../../../components/common/KeyboardAvoidingContainer'
const { width, height } = Dimensions.get("window");

const SignUpScreen = ({navigation}) => {
   const {angleLeft} = iconsPack()
   return (
      <KeyboardAvoidingContainer>
         <View  className="p-4 font-montserratRegular flex flex-row items-center gap-2">
            <TouchableOpacity onPress={() => navigation.goBack()}><Image source={angleLeft} /></TouchableOpacity>
         </View>
         <View style={styles.container} className="p-3 gap-2">
            <Text className="font-montserratBold font-extrabold text-[24px] line-clamp-[43px]">Create Account</Text>
            <Text 
               style={{color : colors.primaryColor}} 
               className=""
            >
               It’s easy, quick and safe!
            </Text>
            <View className="relative flex flex-col w-full gap-2 items-center">
               <View className="flex flex-row w-full justify-center m-0 p-0">
                  <View className="w-[50%]">
                     <PrimaryInput
                        style={"w-full"} 
                        label={'First Name'}
                        placeHolder={'John'}
                     />
                  </View>
                  <View className="w-[50%]">
                     <PrimaryInput 
                        style={"w-full"}
                        label={'Last Name'}
                        placeHolder={'Doe'}
                     />
                  </View>
               </View>
               <View className="flex w-full">
                  <PrimaryInput 
                     style={"w-full mb-4"}
                     label={'Email Address'}
                     placeHolder={'JohnDoe@gmail.com'}
                  />
               </View>
               <View className="flex w-full">
                  <PhoneNumberInput 
                     style={"w-full mb-4"}
                     type={'phone-pad'}
                     label={'Mobile Number'}
                     placeHolder={'8045324621'}
                  />
               </View>
               <View className="w-full">
                  <DropDownPicker  
                     style={'w-full'}
                     placeHolder={'Select'}
                     defaultOption={"Please Select"}
                     label={'Where are you located ?*'}
                     options={[
                     {"label" : "Abia"},
                     {"label" : "Adamawa"},
                     {"label" : "Akwa Ibom"},
                     {"label" : "Anambra"},
                     {"label" : "Bauchi"},
                     {"label" : "Bayelsa"},
                     {"label" : "Benue"},
                     {"label" : "Borno"},
                     {"label" : "Cross River"},
                     {"label" : "Delta"},
                     {"label" : "Ebonyi"},
                     {"label" : "Edo"},
                     {"label" : "Ekiti"},
                     {"label" : "Enugu"},
                     {"label" : "FCT - Abuja"},
                     {"label" : "Gombe"},
                     {"label" : "Imo"},
                     {"label" : "Jigawa"},
                     {"label" : "Kaduna"},
                     {"label" : "Kano"},
                     {"label" : "Katsina"},
                     {"label" : "Kebbi"},
                     {"label" : "Kogi"},
                     {"label" : "Kwara"},
                     {"label" : "Lagos"},
                     {"label" : "Nasarawa"},
                     {"label" : "Niger"},
                     {"label" : "Ogun"},
                     {"label" : "Ondo"},
                     {"label" : "Osun"},
                     {"label" : "Oyo"},
                     {"label" : "Plateau"},
                     {"label" : "Rivers"},
                     {"label" : "Sokoto"},
                     {"label" : "Taraba"},
                     {"label" : "Yobe"},
                     {"label" : "Zamfara"}
                      ]}
                  />
               </View>
               <View className="w-full">
                  <DropDownPicker  
                     style={'w-full'}
                     placeHolder={'Select'}
                     defaultOption={"Please Select"}
                     label={'Where are you located ?*'}
                     options={[
                     {"label" : "Abia"},
                     {"label" : "Adamawa"},
                     {"label" : "Akwa Ibom"},
                     {"label" : "Anambra"},
                     {"label" : "Bauchi"},
                     {"label" : "Bayelsa"},
                     {"label" : "Benue"},
                     {"label" : "Borno"},
                     {"label" : "Cross River"},
                     {"label" : "Delta"},
                     {"label" : "Ebonyi"},
                     {"label" : "Edo"},
                     {"label" : "Ekiti"},
                     {"label" : "Enugu"},
                     {"label" : "FCT - Abuja"},
                     {"label" : "Gombe"},
                     {"label" : "Imo"},
                     {"label" : "Jigawa"},
                     {"label" : "Kaduna"},
                     {"label" : "Kano"},
                     {"label" : "Katsina"},
                     {"label" : "Kebbi"},
                     {"label" : "Kogi"},
                     {"label" : "Kwara"},
                     {"label" : "Lagos"},
                     {"label" : "Nasarawa"},
                     {"label" : "Niger"},
                     {"label" : "Ogun"},
                     {"label" : "Ondo"},
                     {"label" : "Osun"},
                     {"label" : "Oyo"},
                     {"label" : "Plateau"},
                     {"label" : "Rivers"},
                     {"label" : "Sokoto"},
                     {"label" : "Taraba"},
                     {"label" : "Yobe"},
                     {"label" : "Zamfara"}
                      ]}
                  />
               </View>
               <View className="w-full">
                  <DropDownPicker  
                     style={'w-full'}
                     placeHolder={'Select'}
                     defaultOption={"Please Select"}
                     label={'Where are you located ?*'}
                     options={[
                     {"label" : "Abia"},
                     {"label" : "Adamawa"},
                     {"label" : "Akwa Ibom"},
                     {"label" : "Anambra"},
                     {"label" : "Bauchi"},
                     {"label" : "Bayelsa"},
                     {"label" : "Benue"},
                     {"label" : "Borno"},
                     {"label" : "Cross River"},
                     {"label" : "Delta"},
                     {"label" : "Ebonyi"},
                     {"label" : "Edo"},
                     {"label" : "Ekiti"},
                     {"label" : "Enugu"},
                     {"label" : "FCT - Abuja"},
                     {"label" : "Gombe"},
                     {"label" : "Imo"},
                     {"label" : "Jigawa"},
                     {"label" : "Kaduna"},
                     {"label" : "Kano"},
                     {"label" : "Katsina"},
                     {"label" : "Kebbi"},
                     {"label" : "Kogi"},
                     {"label" : "Kwara"},
                     {"label" : "Lagos"},
                     {"label" : "Nasarawa"},
                     {"label" : "Niger"},
                     {"label" : "Ogun"},
                     {"label" : "Ondo"},
                     {"label" : "Osun"},
                     {"label" : "Oyo"},
                     {"label" : "Plateau"},
                     {"label" : "Rivers"},
                     {"label" : "Sokoto"},
                     {"label" : "Taraba"},
                     {"label" : "Yobe"},
                     {"label" : "Zamfara"}
                      ]}
                  />
               </View>
               <View className="w-full">
                  <Text className="text-[#6B7C97] text-[14px] font-medium py-2 font-montserratRegular">
                     Means Of Identification
                  </Text>


                  <View className="w-full mt-3">
                        <CheckBox label="Driver's License" />
                        <CheckBox label="Internation Passport" />
                        <CheckBox label="National Id Card" />
                        <CheckBox label="Voter's Card" />
                        <CheckBox label="NIN Slip" />
                  </View>
               </View>
               <View className="w-full">
                  <SquareButton 
                     text="Sign In" 
                     styles={{backgroundColor : colors.primaryColor , width : '100%' , marginTop: 20}} 
                  />
               </View>
               <View className={`items-center w-[60%] mt-2`} style={{ height: height * 0.35 }}>
                  <View className={`flex-row flex-wrap justify-center gap-1 items-center  mt-[18px] space-x-1`}>
                     <Text className={`text-[14px] font-montserratSemiBold text-subTitle`}>
                      By continuing,
                     </Text>
                     <TouchableOpacity>
                       <Text
                         className={`text-[14px] font-montserratSemiBold text-primaryColor`}
                         onPress={() => navigation.navigate("SignInEmail")}
                       >
                         terms of service
                       </Text>
                     </TouchableOpacity>
                     <Text className={`text-[14px] font-montserratSemiBold text-subTitle`}>
                      and
                     </Text>
                     <TouchableOpacity>
                        <Text
                          className={`text-[14px] font-montserratSemiBold text-primaryColor`}
                          onPress={() => navigation.navigate("SignInEmail")}
                        >
                           privacy policy
                        </Text>
                    </TouchableOpacity>
                     <Text className={`text-[14px] font-montserratSemiBold text-subTitle`}>
                      Apply
                     </Text>
                  </View>
               </View>
            </View>
         </View>
      </KeyboardAvoidingContainer>
   )
}

const styles = StyleSheet.create({
   container: {
     width : width,
     display : 'flex',
     gap: '20px'
   }
});

export default SignUpScreen
