import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native';
import {  StyleSheet, Text ,View } from 'react-native'
import { colors } from '../../../themes/colors';



const BottomSheetLoading = () => {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    animateLoader();
  }, []);
  const done = () => {
    console.log('done')
  }
  const animateLoader = () => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        done()
      }
    });
  };
  return (
   <View style={styles.container} className="absolute z-50 flex justify-center items-center h-screen w-full">
      <View className="relative bg-white w-[50px] h-[50px] rounded-md flex justify-center items-center">
         <View className="relative z-10 w-[20px] h-[20px] rounded-full  bg-white animate-bounce flex justify-center items-center">
         </View>
         <Animated.View style={[
          styles.loader,
          {
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
          },
          ]}/>
      </View>
      <View className="mt-4 text-white">
        <Text className="text-white">Accepting Errands...</Text>
      </View>
   </View>
  )
}


const styles = StyleSheet.create({
   container: {
     backgroundColor: "rgba(0, 0, 0, 0.7)",
   },
   loader: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.primaryColor,
    borderRadius: 4,
    position : 'absolute',
    bottom : 0,
    left: 0
  },
 });

export default BottomSheetLoading
