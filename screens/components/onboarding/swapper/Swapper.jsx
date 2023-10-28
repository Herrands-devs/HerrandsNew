import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Swiper from "react-native-swiper";
import FirstSlide from "./FirstSlide";
import SecondSlide from "./SecondSlide";
import ThirdSlide from "./ThirdSlide";
import NextArrow from "../../../../assets/icons/next-arrows.png";
import { SquareButton } from "../../common/Button";
import { colors } from "../../../../themes/colors";
import BackIcon from "../../../../assets/icons/back-icon.png";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";

const Swapper = ({ navigation }) => {
  const swiperRef = React.createRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [getStartedLoading, setGetStartedLoading] = useState(false);

  const handleNext = () => {
    if (currentIndex === 2) {
    } else if (swiperRef && swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handlePrevious = () => {
    if (swiperRef && swiperRef.current && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      swiperRef.current.scrollBy(-1);
    }
  };

  const handleSwipe = (index) => {
    setCurrentIndex(index);
  };

  const handleGetStarted = async () => {
    navigation.replace("VideoChoice");
    // setGetStartedLoading(true);

    // const registerForPushNotificationsAsync = async () => {
    //   const { status: existingStatus } =
    //     await Notifications.getPermissionsAsync();
    //   let finalStatus = existingStatus;

    //   if (existingStatus !== "granted") {
    //     const { status } = await Notifications.requestPermissionsAsync();
    //     finalStatus = status;
    //   }

    //   if (finalStatus !== "granted") {
    //     alert("Failed to get push token for push notification!");
    //     return;
    //   }
    // };

    // registerForPushNotificationsAsync().then(() => {
    //   const requestLocationPermission = async () => {
    //     const { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== "granted") {
    //       alert("Permission to access location was denied");
    //     }
    //   };

    //   requestLocationPermission();

    //   // Access user's location data
    //   const getLocation = async () => {
    //     const { coords } = await Location.getCurrentPositionAsync({});
    //     // console.log("User location:", coords);
    //   };

    //   getLocation().then(() => {
    //     setGetStartedLoading(false);
    //     navigation.replace("VideoChoice");
    //   });
    // });
  };

  return (
    <ImageBackground className={`flex-1`}>
      <View className={`flex-1 absolute top-0 left-0 w-full h-full `}>
        {currentIndex > 0 && (
          <TouchableOpacity
            onPress={handlePrevious}
            className={`absolute mt-[50px] ml-[16px] z-20`}
          >
            <Image source={BackIcon} className={`w-[24px] h-[24px]`} />
          </TouchableOpacity>
        )}
        <Swiper
          ref={swiperRef}
          loop={false}
          scrollEnabled={false}
          onIndexChanged={handleSwipe}
          showsPagination={false}
        >
          <FirstSlide />
          <SecondSlide />
          <ThirdSlide />
        </Swiper>

        <View className={`absolute bottom-0 w-full h-[12%] items-center`}>
          <View className={`space-x-3 flex-row items-center`}>
            {[0, 1, 2].map((index) => (
              <View
                key={index}
                className={`w-[18.6px] h-[2px] ${
                  index !== currentIndex ? `bg-[#53565A]` : `bg-primaryColor`
                }`}
              />
            ))}
          </View>

          <View className={`mt-[22px] w-full relative`}>
            {currentIndex === 2 ? (
              <View>
                <SquareButton
                  text={"Get Started"}
                  styles={{
                    backgroundColor: colors.primaryColor,
                    justifyContent: "center",
                    width: "90%",
                    position: "absolute",
                    left: "5%",
                  }}
                  onPress={handleGetStarted}
                  loading={getStartedLoading}
                />
              </View>
            ) : (
              <TouchableOpacity
                className={`flex-row items-center text-center justify-center`}
                onPress={handleNext}
              >
                <Text
                  className={`text-[14px] font-montserratBold text-primaryColor`}
                >
                  Next
                </Text>
                <Image source={NextArrow} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Swapper;

const styles = StyleSheet.create({});
