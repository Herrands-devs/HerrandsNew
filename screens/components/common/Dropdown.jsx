import { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';

export const DropDownPicker = ({
   style,
   type,
   value,
   placeHolder,
   disabled,
   label,
   iconName,
   iconColor,
   iconSize,
   defaultOption,
   options
}) => {
   const [isFocused , setFocused] = useState(false)
   const [isActive , setIsActive] = useState(false)
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
         <View onPress={() => setFocused(true)} onBlur={() => setFocused(false)} className={`${style} h-[45px] bg-[#F7F7F7] rounded-[4px] flex flex-row items-center px-2`} style={[
            isFocused && {borderWidth: 2, borderRadius : '4px', borderColor : '#0066F5'}
         ]}>
            {!isActive ?
            <TouchableOpacity onPress={() => setIsActive(!isActive)} className="w-full h-full flex justify-center cursor-pointer">
               <Text className="text-[#6B7C97]">{defaultOption}</Text>
            </TouchableOpacity>
            :
            <TextInput onBlur={() => setIsActive(false)} type={type} value={value} placeholder={placeHolder} placeholderTextColor="#C6C6C6"  className="w-full h-full flex justify-center text-[14px] px-2" style={[
               disabled && {backgroundColor : '#C6C6C6' , color : 'white'}
            ]} editable={!disabled}/>
            }
         </View>
         {isActive &&
            <View className="absolute top-[100%] z-10 w-full h-[150px] overflow-scroll border border-[#c4c4c463] rounded-b-sm px-1 py-3 bg-white">
               {options.map((option , index) => (
                  <TouchableOpacity
                     key={index}
                  >
                     <Text className="p-2 text-[#6B7C97]">{option.label}</Text>
                  </TouchableOpacity>
               ))}
            </View>
         }
      </View>
   )
}
