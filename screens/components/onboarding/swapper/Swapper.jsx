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

const Swapper = ({ navigation }) => {
  const swiperRef = React.createRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const firstImage = require("../../../../assets/first-bg.png");
  const secondImage = require("../../../../assets/second-bg.png");
  const thirdImage = require("../../../../assets/third-bg.png");

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

  return (
    <ImageBackground className={`flex-1`}>
      <View
        className={`flex-1 absolute top-0 left-0 w-full h-full `}
      >
        {currentIndex > 0 && (
          <TouchableOpacity
            onPress={handlePrevious}
            className={`absolute mt-[50px] ml-[30px] z-20`}
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

        <View
          className={`absolute bottom-0 w-full h-[15%] flex-col items-center`}
        >
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

          <View className={`mt-[22px]`}>
            {currentIndex === 2 ? (
              <View>
                <SquareButton
                  text={"Get Started"}
                  styles={{
                    backgroundColor: colors.primaryColor,
                    justifyContent: "center",
                    width: "100%",
                  }}
                  onPress={() => navigation.navigate("VideoChoice")}
                />
              </View>
            ) : (
              <TouchableOpacity
                className={`flex-row items-center`}
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
