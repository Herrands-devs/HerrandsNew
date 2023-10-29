import React, { useEffect, useState } from 'react'
import { Image, Keyboard } from 'react-native'
import { Text, View } from 'react-native'
import { RoundedInput } from '../../../components/common/Inputs'
import { formatCurrency } from '../../../../helpers/CurrencyFormatter'
import HorizontalLoader from '../../../components/common/HorizontalLoader'
import { RoundedButton, SquareButton } from '../../../components/common/Button'
import Notification from '../../../components/common/Notification'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Button } from '@rneui/base'
import { TouchableOpacity } from 'react-native'


export const NoOrder = () => {
   const [moveup, setMoveup] = useState(false);
   const [update, setUpdate] = useState(false)
   return (
      <View className={`absolute z-30 ${moveup ? 'min-h-[480px]' : 'min-h-[280px] '}   rounded-t-[20px] p-6 bg-[#FFFFFF] w-full bottom-0`}>
         <View className="flex gap-2 border-b pb-6 border-[#99c2fb1f]">
            <Text className="font-montserratSemiBold text-[25px]">No current errands</Text>
            {/* <Text>{text}</Text> */}
            <Text className="text-[#000E23] font-montserratRegular">increase your location radius for higher chances</Text>
         </View>

         <View className="flex flex-row gap-4">
            <View className="w-[10%] py-6 flex justify-center items-center gap-2">
               <View className="flex justify-center items-center w-[28px] h-[28px] bg-[#0066f52f]  rounded-full">
                  <View className="w-[10px] h-[10px] rounded-full bg-[#0066F5]"></View>
               </View>
               <View className="h-[15px] w-[2px]">
                  <Image source={require('../../../../assets/icons/dotv.png')} className="h-full w-full" />
               </View>
               <View className="flex justify-center items-center w-[28px] h-[28px] bg-[#0066f52f]  rounded-full">
                  <Image source={require('../../../../assets/icons/location.png')} className="w-[12px] h-[14px]" />
               </View>

            </View>
            <View className="w-[80%] flex gap-3 items-center justify-center">
               <View className="w-full">
                  <RoundedInput
                    style={"w-full"}
                    placeHolder={"Stark Tower"}
                  />
               </View>
               <View className="w-full">
                  <RoundedInput
                    style={"w-full"}
                    placeHolder={"Stark Tower"}
                  />
               </View>
            </View>
         </View>
      </View>
   )
}

export const IncomeOrder = () => {
   const [moveup, setMoveup] = useState(false);
   const [update, setUpdate] = useState(false)
   return (
      <View className={`absolute z-40 min-h-[280px]  rounded-t-[20px] p-6 bg-[#FFFFFF] w-full bottom-0`}>
         <View className="w-full flex p-2 flex-row justify-between items-center">
            <View className="flex flex-row gap-x-5">
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
         <View className="p-1 flex gap-8 mt-3 border-t border-[#F9F9F9]">
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
                  <Text className="text-[18px] text-[#000E23]">Recipients Address</Text>
                  <Text className="text-[18px] font-montserratRegular text-[#000E23]">1hr 45min</Text>
               </View>
               <View className="flex flex-row items-center">
                  <Image source={require('../../../../assets/icons/email.png')} />
                  <Text className="text-[#000E23] font-montserratRegular ml-2">Ibukun St, Yaba 101241, Ikeja, Lagos.</Text>
               </View>
            </View>

            <View>
               <HorizontalLoader duration={'30000'}/>
            </View>
            <View className="flex justify-between flex-row">
               <RoundedButton 
                  text="Ignore" 
                  styles={{width : "40%" , backgroundColor : '#EA133E'}}
                  loading={false}
               />
               <RoundedButton 
                  text="Accept" 
                  styles={{width : "40%" , backgroundColor : '#0066F5'}}
                  loading={false}
                  onPress={() => setUpdate(true)}
               />
            </View>
            <Notification 
               isVisible={update} 
               title={"Are you sure ,You want to accept this order?"} 
               subTitle={"By tapping proceed it means you are to deliver the order"} 
               btnBackground={"#0066F5"} 
               btnText={"Progress"}
               image={require('../../../../assets/gifs/question.gif')}
               onClose={() => setUpdate(false)}
            />
         </View>
      </View>
   )
}

export const InProgress = () => {
   const [update, setUpdate] = useState(false)
   return (
      <View className={`absolute z-50 min-h-[180px]  rounded-t-[20px] px-6  bg-[#FFFFFF] w-full bottom-0`}  >
         <TouchableOpacity className="w-full flex justify-center items-center py-3 pb-4"  onPress={() => this.RBSheet.open()} >
            <View className="w-[53px] h-[5px] bg-[#C6C6C6]" />
         </TouchableOpacity>
         <View>
            <View className="flex gap-2 border-b pb-6 border-[#99c2fb1f]">
               <Text className="font-montserratSemiBold text-[25px]">Errand in progress</Text>
               {/* <Text>{text}</Text> */}
               <Text className="text-[#000E23] font-montserratRegular">Click the indicator above for full details</Text>
            </View>
            <View className="w-full flex  mt-4 flex-row justify-between items-center">
               <View className="flex flex-row gap-x-5">
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
            <View className="p-1 flex gap-8 mt-3 border-t border-[#F9F9F9]">
               <View className="flex gap-2">
                  <Text className="text-[18px] text-[#000E23]">Item’s description</Text>
                  <View className="flex flex-row items-center">
                     <Image source={require('../../../../assets/icons/box.png')} />
                     <Text className="text-[#000E23] font-montserratRegular ml-2">58 inches smart TV</Text>
                  </View>
               </View>
            </View>
         </View>
         <RBSheet
            ref={ref => {
               this.RBSheet = ref;
            }}
            minClosingHeight={100}
            closeOnDragDown={true}
            height={700}
            openDuration={250}
            customStyles={{
            wrapper: {
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "#C6C6C6"
            }
          }}
         >
            <View className="rounded-t-[20px] bg-[#FFFFFF]">
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
               <Notification 
                  isVisible={update} 
                  title={"Parcel Delivered ?"} 
                  subTitle={"By tapping proceed it means your task has been completed successfully"} 
                  btnBackground={"#0066F5"} 
                  btnText={"Progress"}
                  image={require('../../../../assets/gifs/question.gif')}
                  onClose={() => setUpdate(false)}
               />
            </View>
         </RBSheet>
      </View>
   )
}