import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { iconsPack } from '../../components/icons'
import { Image } from 'react-native'
const { width } = Dimensions.get("window");


const SupportScreen = ({navigation}) => {
   const {angleLeft,webIcon,switchIcon,guideIcon,supportIcon ,angleRight} = iconsPack()
   return (
      <SafeAreaView className="bg-white h-full">
         <TouchableOpacity  className="p-6 font-montserratRegular flex flex-row items-center gap-5" onPress={() => navigation.goBack()}>
            <TouchableOpacity onPress={() => navigation.goBack()}><Image source={angleLeft} /></TouchableOpacity>
            <Text className="text-[24px] text-[#000E23] font-semibold font-MontserratMedium">Support</Text>
         </TouchableOpacity>

         <View style={styles.container}>
            
            <View className="border-t w-[90%] flex flex-col  py-4 border-[#F9F9F9]">
               <View className="flex flex-row justify-between pb-12 items-center w-full">
                  <View className="flex flex-row gap-8 items-center">
                     <Image source={guideIcon} />
                     <Text className="text-[18px] font-montserratRegular">Guides</Text>
                  </View>
                  <Image source={angleRight} />
               </View>

               <View className="flex flex-row justify-between pb-12 items-center w-full">
                  <View className="flex flex-row gap-8 items-center">
                     <Image source={supportIcon} />
                     <Text className="text-[18px] font-montserratRegular">Get Help</Text>
                  </View>
                  <Image source={angleRight} />
               </View>
            </View>
         </View>
      </SafeAreaView>
   )
}
const styles = StyleSheet.create({
   container: {
     width : width,
     display : 'flex',
     alignItems : 'center',
     justifyContent : 'center',
     gap: '20px'
   }
});
export default SupportScreen