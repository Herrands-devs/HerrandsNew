import { Text, View } from "react-native"
import { formatCurrency } from "../../../../helpers/CurrencyFormatter"
import { useState } from "react"
import { Image } from "react-native"

export const Earned = () => {
   const [amount] = useState(25000)
   return (
      <View>
         <View className="flex flex-row items-end gap-x-8">
            <View>
               <View className="bg-[#F1F1F1] w-[30px] h-[30px] flex" />
               <Text className="text-[#F1F1F1]">Feb</Text>
            </View>
            <View>
               <View className="bg-[#F1F1F1] w-[30px] h-[173px] flex" />
               <Text className="text-[#F1F1F1]">Mar</Text>
            </View>
            <View>
               <View className="bg-[#F1F1F1] w-[30px] h-[200px] flex" />
               <Text className="text-[#F1F1F1]">Apr</Text>
            </View>
            <View>
               <View className="relative bg-[#0066F5] w-[30px] h-[217px] flex">
                  <View className="absolute -top-10 left-1/2">
                     <View className="bg-[#0066F5] w-[2px] h-[100px]" />
                  </View>
                  <View className="absolute -top-[60px] -left-[70%]">
                     <View className="w-[79px] bg-[#0066F5] h-[30px] flex flex-row items-center justify-center gap-x-1 rounded-sm">
                        <View className="w-[12px] h-[10px] ">
                           <Image source={require('../../../../assets/icons/naira.png')} className="w-full h-full" />
                        </View>
                        <Text className="text-white">{amount.toLocaleString()}</Text>
                     </View>
                  </View>
               </View>
               <Text className="text-[#F1F1F1]">May</Text>
            </View>
            
            <View>
               <View className="bg-[#F1F1F1] w-[30px] h-[103px] flex" />
               <Text className="text-[#F1F1F1]">Jun</Text>
            </View>
            <View>
               <View className="bg-[#F1F1F1] w-[30px] h-[43px] flex" />
               <Text className="text-[#F1F1F1]">Jul</Text>
            </View>
         </View>
      </View>
   )
}

export const TransactionHashSuccess = () => {
   const [amount] = useState(25000)
   return (
      <View className="mt-5 flex flex-row gap-x-4">
         <View className="w-[40px] h-[40px] bg-[#1ff30c30] rounded-[3px]">

         </View>
         <View className="h-[40px] flex justify-between">
            <View className="">
               <Text className="text-[#000E23] text-lg font-montserratSemiBold">{amount.toLocaleString()}</Text>
            </View>
            <Text className="text-[#53565A] font-montserratMedium">Withdrawal Succesful</Text>
         </View>

         <View className="h-[40px] flex justify-between">
            <View className="">
               
            </View>
            <Text className="text-[#53565A] font-montserratMedium">10/05/2023 at 11:37 AM</Text>
         </View>
      </View>
   )
}

export const TransactionHashFailed = () => {
   const [amount] = useState(25000)
   return (
      <View className="mt-5 flex flex-row gap-x-4">
         <View className="w-[40px] h-[40px] flex justify-center items-center bg-[#ea133e24] rounded-[3px]">
            <Image source={require('../../../../assets/icons/failed.png')} />
         </View>
         <View className="h-[40px] flex justify-between">
            <View className="">
               <Text className="text-[#000E23] text-lg font-montserratSemiBold">{amount.toLocaleString()}</Text>
            </View>
            <Text className="text-[#53565A] font-montserratMedium">Withdrawal Failed       </Text>
         </View>

         <View className="h-[40px] flex justify-between">
            <View className="">
               
            </View>
            <Text className="text-[#53565A] font-montserratMedium">10/05/2023 at 11:37 AM</Text>
         </View>
      </View>
   )
}