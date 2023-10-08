import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import BackIcon from "../../../assets/icons/back-icon.png";
import CollinsImage from "../../../assets/collins.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CheckIcon from "../../../assets/icons/check-icon.png";
import { Dimensions } from "react-native";
import { formatCurrency } from "../../../helpers/CurrencyFormatter";
import RightBlue from "../../../assets/icons/right-blue-icon.png";

const { width, height } = Dimensions.get("window");

const CustomerErrandDetails = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { name, status, title, description, price } = route.params;

  return (
    <View>
      <View
        className={`bg-primaryColor w-full p-[16px]`}
        style={{ paddingTop: insets.top, marginBottom: height * 0.0474 }}
      >
        <View className={`flex-row items-center justify-between`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BackIcon} />
          </TouchableOpacity>

          <View className={`flex-row items-center space-x-2`}>
            <Image source={CollinsImage} className={`w-[16px] h-[16px]`} />
            <Text className={`text-white text-[12px] font-montserratSemiBold`}>
              {name}
            </Text>
          </View>
        </View>

        <View className={`flex-row items-center justify-between mt-[16px]`}>
          <View>
            <Text className={`text-white text-[24px] font-montserratMedium`}>
              {status === "In progress"
                ? "Errand In Progress"
                : "Errand Completed"}
            </Text>
            <Text
              className={`text-white font-montserratRegular text-[12px] mt-[4px]`}
            >
              Your errand will be delivered shortly
            </Text>
          </View>

          <View className={`bg-white p-[12px] rounded-full`}>
            <Image source={CheckIcon} className={`w-[24px] h-[24px]`} />
          </View>
        </View>
      </View>

      <View className={`px-[16px]`} style={{ marginBottom: height * 0.3 }}>
        <View
          className={`flex-row items-center justify-between`}
          style={{ marginBottom: height * 0.0368 }}
        >
          <Text className={`text-[16px] font-montserratSemiBold`}>{title}</Text>
          <Text
            className={`text-[12px] font-montserratSemiBold ${
              status === "In progress" ? `text-green` : `text-black`
            }`}
          >
            {status}
          </Text>
        </View>
        <View
          className={`flex-row items-center justify-between`}
          style={{ marginBottom: height * 0.0207 }}
        >
          <Text className={`text-[14px] font-montserratSemiBold`}>
            Item's description
          </Text>
          <Text className={`text-[12px] font-montserratMedium text-black`}>
            {description}
          </Text>
        </View>
        <View
          className={`flex-row items-center justify-between`}
          style={{ marginBottom: height * 0.0207 }}
        >
          <Text className={`text-[14px] font-montserratSemiBold`}>
            Item's address
          </Text>
          <Text className={`text-[12px] font-montserratMedium text-black`}>
            Lawani st, surulere 101241, Ikeja, Lagos
          </Text>
        </View>
        <View
          className={`flex-row items-center justify-between`}
          style={{ marginBottom: height * 0.0474 }}
        >
          <Text className={`text-[14px] font-montserratSemiBold`}>
            Custodian's phone
          </Text>
          <Text className={`text-[12px] font-montserratMedium text-black`}>
            07020304050
          </Text>
        </View>
        <View
          className={`flex-row items-center justify-between`}
          style={{ marginBottom: height * 0.0207 }}
        >
          <Text className={`text-[14px] font-montserratSemiBold`}>
            Recipient’s address
          </Text>
          <Text className={`text-[12px] font-montserratMedium text-black`}>
            Ibukun st, Yaba 101241, Ikeja, Lagos
          </Text>
        </View>
        <View
          className={`flex-row items-center justify-between`}
          style={{ marginBottom: height * 0.0207 }}
        >
          <Text className={`text-[14px] font-montserratSemiBold`}>
            Recipient’s phone
          </Text>
          <Text className={`text-[12px] font-montserratMedium text-black`}>
            07020304050
          </Text>
        </View>
        <View
          className={`flex-row items-center justify-between`}
          style={{ marginBottom: height * 0.0207 }}
        >
          <Text className={`text-[14px] font-montserratSemiBold`}>Price</Text>
          <Text
            className={`text-[20px] font-montserratMedium ${
              status === "Completed" ? `text-black` : `text-green`
            }`}
          >
            {formatCurrency(price)}
          </Text>
        </View>
      </View>

      <View className={`items-center`}>
        <TouchableOpacity className={`flex-row items-center space-x-1`}>
          <Text
            className={`text-[14px] font-montserratMedium text-primaryColor`}
          >
            {status === "Completed" ? "Report an issue" : "Track this errand"}
          </Text>
          <Image source={RightBlue} className={`w-[16px] h-[16px]`} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomerErrandDetails;

const styles = StyleSheet.create({});
