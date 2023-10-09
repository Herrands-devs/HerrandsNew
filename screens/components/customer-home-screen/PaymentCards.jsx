import { ImageBackground, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import MasterCard from "../../../assets/master-card.png";
import { Image } from "react-native";
import ImageCard from "../../../assets/card-bg.png";

export const NoCardComponent = ({ style, onPress }) => {
  return (
    <TouchableOpacity
      className={`w-full bg-[#D5D7DA] p-[16px] rounded-[16px] justify-end`}
      style={style}
      onPress={onPress}
    >
      <View className={`flex-row items-center space-x-1`}>
        <View className={`flex-row items-center space-x-1`}>
          {[0, 1, 2, 3].map((_, i) => (
            <View
              className={`w-[10px] h-[10px] bg-white rounded-full`}
              key={i}
            />
          ))}
        </View>
        <Text className={`text-[16px] font-montserratSemiBold text-white`}>
          1234
        </Text>
      </View>
      <View>
        <Text className={`text-[12px] font-montserratRegular text-white`}>
          Expires 01/1010
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const NormalCardComponent = ({ style, onPress, fourDigits, expiry }) => {
  return (
    <TouchableOpacity
      className={`w-full rounded-[16px] justify-end`}
      onPress={onPress}
      style={style}
    >
      <ImageBackground
        source={ImageCard}
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <View className={`p-[16px]`}>
          <View className={`flex-row items-center space-x-1`}>
            <View className={`flex-row items-center space-x-1`}>
              {[0, 1, 2, 3].map((_, i) => (
                <View
                  className={`w-[10px] h-[10px] bg-white rounded-full`}
                  key={i}
                />
              ))}
            </View>
            <Text className={`text-[16px] font-montserratSemiBold text-white`}>
              {fourDigits}
            </Text>
          </View>
          <View className={`flex-row items-center justify-between`}>
            <Text className={`text-[12px] font-montserratRegular text-white`}>
              Expires {expiry}
            </Text>

            <Image source={MasterCard} className={`w-[36px] h-[22px]`} />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
