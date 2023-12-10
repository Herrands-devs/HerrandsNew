import React, { useState } from 'react'
import { Image } from 'react-native'
import { Text } from 'react-native'
import { ScrollView, View } from 'react-native'
import { iconsPack } from '../../components/icons'
import { TouchableOpacity } from 'react-native'
import { formatCurrency } from '../../../helpers/CurrencyFormatter'
import { Earned, TransactionHashFailed, TransactionHashSuccess } from './components/EarningAnalystics'

const EarningsScreen = ({navigation}) => {
   const [amount , setAmount] = useState(true)
   return (
      <View className="h-screen">
         <View className="h-[40%] flex flex-col gap-6 justify-end px-3 bg-[#0066F5]">
            <TouchableOpacity  className="font-montserratRegular flex flex-row items-center" onPress={() => navigation.goBack()}>
               <TouchableOpacity className="mr-5" onPress={() => navigation.goBack()}><Image source={require('../../../assets/icons/iconwhite.png')} /></TouchableOpacity>
               <Text className="text-[24px] text-[#FFFFFF] font-semibold font-MontserratMedium">Earnings</Text>
            </TouchableOpacity>

            <View className="flex flex-row items-center">
               <Text className="text-white font-montserratMedium mr-3">Total Balance</Text>
               <TouchableOpacity className="p-2" onPress={() => setAmount(!amount)}>
                  <Image source={require('../../../assets/icons/eye.png')} />
               </TouchableOpacity>
            </View>

            <View className="flex flex-row items-center">
               <Text className="text-[28px] font-montserratSemiBold text-white">

                  { amount ? formatCurrency(1750000) : "******"}
               </Text>
            </View>

            <View className="flex flex-row items-center">
               <Text className="text-white font-montserratRegular">Account : </Text>
               <Text className="text-white font-montserratRegular">*******4564</Text>
            </View>

           
            <TouchableOpacity className="w-[134px] h-[37px] rounded-sm mb-4 bg-white flex flex-row items-center gap-x-2 justify-center">
               <Image source={require('../../../assets/icons/withdraw.png')} />
               <View className="h-[37px] flex justify-center items-center">
                  <Text className="text-[#0066F5]">Withdraw</Text>
               </View>
               
            </TouchableOpacity>
           
         </View>  
         <ScrollView className="h-[90%]">
            <View className="p-3">
               <View className="bg-white h-[413px] flex justify-between shadow-lg p-6 rounded-sm">
                  <View>
                     <Text className="font-montserratSemiBold text-[16px]">Monthly Earning</Text>
                     <View>

                     </View>
                  </View>

                  <Earned />
               </View>
            </View>
            <View className="p-3">
               <View className="bg-white h-[413px] flex shadow-lg p-6 rounded-sm">
                  <View className="flex flex-row justify-between items-center">
                     <Text className="font-montserratSemiBold text-[16px]">Recent Withdrawal</Text>
                     <Image source={require('../../../assets/icons/update.png')} />
                  </View>
                  <ScrollView indicatorStyle='white'>
                     <TransactionHashSuccess />
                     <TransactionHashFailed />
                     <TransactionHashSuccess />
                     <TransactionHashFailed />
                     <TransactionHashSuccess />
                     <TransactionHashFailed />
                     <TransactionHashSuccess />
                     <TransactionHashFailed />
                     <TransactionHashSuccess />
                     <TransactionHashFailed />
                  </ScrollView>
                  {/* <View className="flex items-center mt-24">
                     <Image
                       source={require("../../../assets/gifs/question.gif")}
                       className={`w-[151px] h-[151px]`}
                     />
                     <Text className="font-montserratBold text-lg mt-3">
                        No history yet!!
                     </Text>
                  </View> */}
               </View>
            </View>
         </ScrollView>
         
      </View>

   )
}

export default EarningsScreen