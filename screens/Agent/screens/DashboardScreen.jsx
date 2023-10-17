import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { Text, View } from 'react-native'
import { RoundedInput } from '../../components/common/Inputs'
import { StyleSheet } from 'react-native'
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const DashboardScreen = () => {
   const [location, setLocation] = useState(null);
   const [errorMsg, setErrorMsg] = useState(null);
   let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
   useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
   return (
      <View>
         <View className="relative h-full bg-red">
            <View style={styles.container}>
               <MapView 
                  style={styles.map}
                  initialRegion={{
                     latitude: location ? location.coords.latitude : 0,
                     longitude: location ? location.coords.longitude : 0,
                     latitudeDelta: location ? location.coords.latitudeDelta: 0,
                     longitudeDelta: location ? location.coords.longitudeDelta : 0,
                   }}
                   zoomEnabled={true}
               >
                  <Marker
                  coordinate={{
                     latitude: location ? location.coords.latitude : 0,
                     longitude: location ? location.coords.longitude : 0,
                  }}
                  />
                  <Circle
                  center={{
                     latitude: location ? location.coords.latitude : 0,
                     longitude: location ? location.coords.longitude : 0,
                  }} 
                  radius={500}
                  fillColor='#0066f52f'
                  strokeWidth={1}
                  strokeColor='#0066f52f'
                  />
               </MapView>
            </View>
            <View className="absolute z-30 min-h-[28 0px]  rounded-t-[20px] p-6 bg-[#FFFFFF] w-full bottom-0">
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
                        <Image source={require('../../../assets/icons/dotv.png')} className="h-full w-full" />
                     </View>
                     <View className="flex justify-center items-center w-[28px] h-[28px] bg-[#0066f52f]  rounded-full">
                        <Image source={require('../../../assets/icons/location.png')} className="w-[12px] h-[14px]" />
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
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
   map: {
     width: '100%',
     height: '100%',
   },
 });

export default DashboardScreen