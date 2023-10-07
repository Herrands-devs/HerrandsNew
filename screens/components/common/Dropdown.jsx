import { useEffect, useRef, useState } from "react"
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"


export const DropDownPicker = ({
   style,
   type,
   value,
   placeHolder,
   disabled,
   label,
   defaultOption,
   options
}) => {
   const viewRef = useRef();
   useEffect(() => {
      setIsActive(false)
   }, [viewRef]);
   const [isFocused , setFocused] = useState(false)
   const [isActive , setIsActive] = useState(false)
   return (
      <View className="relative w-[100%] mb-6"  ref={viewRef}>
         <View className="flex z-0 flex-row items-center gap-2">
            <Text className="text-[#6B7C97] text-[14px] font-montserratRegular py-2">{label}</Text>
         </View>
         <View onPress={() => setFocused(true)} onBlur={() => setFocused(false)} className={`${style} border h-[45px]  -z-1 bg-[#F7F7F7] rounded-[4px] flex flex-row items-center px-2`} style={[
            isFocused && 
            {
               borderWidth: 2, 
               borderRadius : '4px', 
               borderColor : '#0066F5'
            },
            !isFocused && {
               borderRadius: 4,
               borderColor: "#E9E9E9",
             },
         ]}>
            {!isActive ?
            <TouchableOpacity onPress={() => setIsActive(!isActive)} className="w-full h-full flex justify-center cursor-pointer">
               <Text className="text-[#6B7C97] font-montserratRegular">{defaultOption}</Text>
            </TouchableOpacity>
            :
            <TextInput onBlur={() => setIsActive(false)} type={type} value={value} placeholder={placeHolder} placeholderTextColor="#C6C6C6"  className="w-full h-full flex justify-center text-[14px] px-2" style={[
               disabled && {backgroundColor : '#C6C6C6' , color : 'white'}
            ]} editable={!disabled}/>
            }
         </View>
         {isActive &&
            <View className="absolute top-[100%] w-full">
               <ScrollView className="w-full h-[150px] z-[100]  border border-[#c4c4c463] rounded-b-sm px-1 py-3 bg-white">
                     {options.map((option , index) => (
                        <TouchableOpacity
                           key={index}
                        >
                           <Text className="p-2 text-[#6B7C97]">{option.label}</Text>
                        </TouchableOpacity>
                     ))}
               </ScrollView>
            </View>
         }
      </View>
   )
}
