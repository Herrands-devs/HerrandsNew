import React, { useState } from 'react'
import SafeAreaComponent from '../../../components/common/SafeAreaComponent'
import { iconsPack } from '../../../components/icons'
import { Image, TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'
import { formatCurrency } from '../../../../helpers/CurrencyFormatter'
import { SquareButton } from '../../../components/common/Button'
import Notification from '../../../components/common/Notification'
import { colors } from '../../../../themes/colors'

const InProgress = ({navigation}) => {
   const {angleLeft} = iconsPack()
   const [update, setUpdate] = useState(false)
   return (
      <SafeAreaComponent>
         <TouchableOpacity  className="p-6 font-montserratRegular flex flex-row items-center gap-5" onPress={() => navigation.goBack()}>
            <TouchableOpacity onPress={() => navigation.goBack()}><Image source={angleLeft} /></TouchableOpacity>
            <Text className="text-[24px] text-[#000E23] font-semibold font-MontserratMedium">In Progress</Text>
         </TouchableOpacity>


         <View className="w-full flex p-6 flex-row justify-between items-center">
            <View className="flex flex-row gap-5">
               <View className="w-[40px] h-[40px]">
                 <Image
                   source={require("../../../../assets/herrand-profile.png")}
                   className="rounded-full object-cover w-full h-full"
                 />
               </View>
               <View className="h-[40px] flex justify-between">
                  <Text>
                    Ronke Titilayo
                  </Text>
                  <Text className="text-[#0066F5] font-montserratRegular">Send A Package</Text>
               </View>
            </View>
            <View>
               <Text className="text-[#000E23] text-[20px] font-montserratBold">{formatCurrency("9000")}</Text>
            </View>
         </View>
         <View className="p-6 flex gap-8">
            <View className="flex gap-2">
               <Text className="text-[18px] text-[#000E23]">Item’s description</Text>
               <View className="flex flex-row items-center">
                  <Image source={require('../../../../assets/icons/box.png')} />
                  <Text className="text-[#000E23] font-montserratRegular ml-2">58 inches smart TV</Text>
               </View>
            </View>

            <View className="flex gap-2">
               <View className="flex justify-between flex-row">
                  <Text className="text-[18px] text-[#000E23]">Item’s Address</Text>
                  <Text className="text-[18px] font-montserratRegular text-[#000E23]">25min</Text>
               </View>
               <View className="flex flex-row items-center">
                  <Image source={require('../../../../assets/icons/email.png')} />
                  <Text className="text-[#000E23] font-montserratRegular ml-2">Lawani st, surulere 101241, Ikeja, Lagos.</Text>
               </View>
            </View>

            <View className="flex gap-2">
               <View className="flex justify-between flex-row">
                  <Text className="text-[18px] text-[#000E23]">Custodian’s phone</Text>
               </View>
               <View className="flex flex-row items-center">
                  <Image source={require('../../../../assets/icons/phone.png')} />
                  <Text className="text-[#000E23] font-montserratRegular ml-2">07020304050</Text>
               </View>
            </View>

            <View className="flex gap-2">
               <View className="flex justify-between flex-row">
                  <Text className="text-[18px] text-[#000E23]">Recipients Address</Text>
                  <Text className="text-[18px] font-montserratRegular text-[#000E23]">1hr 45min</Text>
               </View>
               <View className="flex flex-row items-center">
                  <Image source={require('../../../../assets/icons/email.png')} />
                  <Text className="text-[#000E23] font-montserratRegular ml-2">Ibukun St, Yaba 101241, Ikeja, Lagos.</Text>
               </View>
            </View>

            <View className="flex gap-2">
               <View className="flex justify-between flex-row">
                  <Text className="text-[18px] text-[#000E23]">Recipients Phone</Text>
               </View>
               <View className="flex flex-row items-center">
                  <Image source={require('../../../../assets/icons/phone.png')} />
                  <Text className="text-[#000E23] font-montserratRegular ml-2">07020304050</Text>
               </View>
            </View>

            <View className="flex gap-2">
               <View className="flex justify-between flex-row">
                  <Text className="text-[18px] text-[#000E23]">Manage Order</Text>
               </View>
               <View className="flex flex-row items-center justify-between">
                  <View className="flex flex-row items-center">
                     <Image source={require('../../../../assets/icons/user.png')} />
                     <Text className="text-[#000E23] font-montserratRegular ml-2">Order Placed</Text>
                  </View>
                  <TouchableOpacity 
                     className="bg-[#0066F5] h-[26px] w-[111px] rounded-full flex justify-center items-center"
                     onPress={() => setUpdate(true)}
                  >
                     <Text className="text-white">Tap to Update</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
         <View className="w-full p-6">
            <SquareButton
              text="Contact"
              styles={{
                backgroundColor: '#34A853',
                marginTop: 20,
              }}
              onPress={() => navigation.navigate("CompleteScreen")}
            />
         </View>
         <Notification 
            isVisible={update} 
            title={"Parcel Delivered ?"} 
            subTitle={"By tapping proceed it means your task has been completed successfully"} 
            btnBackground={"#0066F5"} 
            btnText={"Progress"}
            image={require('../../../../assets/gifs/question.gif')}
            onClose={() => setUpdate(false)}
         />
      </SafeAreaComponent>
   )
}

export default InProgress