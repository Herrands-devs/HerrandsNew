import { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { Ionicons } from '@expo/vector-icons';

export const PrimaryInput = ({
   type,
   placeHolder,
   value,
   onChangeText,
   style,
   label,
   iconName,
   iconSize,
   iconColor,
   disabled,
   ...rest
}) => {
   const [isFocused , setFocused] = useState(false)
   return (
      <View className="w-[80%]">
         {/* if Icon */}
         <View className="flex flex-row items-center gap-2">
            {iconName &&
               <TouchableOpacity>
                  <Ionicons name={iconName} size={iconSize} color={iconColor} />
               </TouchableOpacity>
            }
            <Text className="text-[#6B7C97] text-[14px] font-medium py-2">{label}</Text>
         </View>
         <View className={`${style} h-[45px] bg-[#F7F7F7] rounded-[4px]`}>
            <TextInput type={type} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} value={value} placeholder={placeHolder} placeholderTextColor="#C6C6C6"  className="w-full h-full flex justify-center text-[14px] px-2" style={[
               isFocused && {borderWidth: 2, borderRadius : '4px', borderColor : '#0066F5'}, disabled && {backgroundColor : '#C6C6C6' , color : 'white'}
            ]} editable={!disabled}/>
         </View>
      </View>
   )
}


export const PhoneNumberInput = ({
   type,
   placeHolder,
   value,
   onChangeText,
   style,
   label,
   iconName,
   iconSize,
   iconColor,
   ...rest
}) => {
   const [isFocused , setFocused] = useState(false)
   return (
      <View className="w-[80%]">
         {/* if Icon */}
         <View className="flex flex-row items-center gap-2">
            <TouchableOpacity>
               {iconName &&
                  <Ionicons name={iconName} size={iconSize} color={iconColor} />
               }
            </TouchableOpacity>
            <Text className="text-[#6B7C97] text-[14px] font-medium py-2">{label}</Text>
         </View>
         <View onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} className={`${style} h-[45px] bg-[#F7F7F7] rounded-[4px] flex flex-row items-center px-2 ${isFocused && 'shadow-sm'}`} style={[
            isFocused && {borderWidth: 2, borderRadius : '4px', borderColor : '#0066F5'}
         ]}>
            <TouchableOpacity>
               <Ionicons name={iconName} size={iconSize} color={iconColor} />
            </TouchableOpacity>
            <View className="w-[10%] h-full flex justify-center items-center">
               <Text className="text-[#082552] font-medium text-[12px] font-montserratRegular">+234</Text>
            </View>
            <TextInput type={type}  value={value} placeholder={placeHolder} placeholderTextColor="#C6C6C6"  className="w-[80%] h-full flex justify-center text-[14px] px-2" />
         </View>
      </View>
   )
}


export const OtpInputs = () => {
   const [isFocused , setFocused] = useState(false)
   return (
      <View className="w-[80%]">
         <View className="flex flex-row justify-between">
            <TextInput className="w-[76px] h-[64px] rounded-[5px] flex justify-center items-center  text-center text-xl font-bold bg-[#D5D7DA]" 
               onFocus={() => setFocused(true)} 
               onBlur={() => setFocused(false)} 
               style={[isFocused && {borderWidth: 2, borderColor : '#0066F5' , backgroundColor: 'white'}]}
            />

            <TextInput className="w-[76px] h-[64px] rounded-[5px] flex justify-center items-center  text-center text-xl font-bold bg-[#D5D7DA]" 
               onFocus={() => setFocused(true)} 
               onBlur={() => setFocused(false)} 
               style={[isFocused && {borderWidth: 2, borderColor : '#0066F5' , backgroundColor: 'white'}]}
            />

            <TextInput className="w-[76px] h-[64px] rounded-[5px] flex justify-center items-center  text-center text-xl font-bold bg-[#D5D7DA]" 
               onFocus={() => setFocused(true)} 
               onBlur={() => setFocused(false)} 
               style={[isFocused && {borderWidth: 2, borderColor : '#0066F5' , backgroundColor: 'white'}]}
            />

            <TextInput className="w-[76px] h-[64px] rounded-[5px] flex justify-center items-center  text-center text-xl font-bold bg-[#D5D7DA]" 
               onFocus={() => setFocused(true)} 
               onBlur={() => setFocused(false)} 
               style={[isFocused && {borderWidth: 2, borderColor : '#0066F5' , backgroundColor: 'white'}]}
            />
            
         </View>
      </View>
   )
}
