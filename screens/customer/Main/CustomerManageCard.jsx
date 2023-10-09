import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import BackIcon from "../../../assets/icons/back-icon-black.png";
import { Dimensions } from "react-native";
import { NormalCardComponent } from "../../components/customer-home-screen/PaymentCards";
import { Switch } from "@rneui/themed";
import { colors } from "../../../themes/colors";
import { SquareButton } from "../../components/common/Button";
import { color } from "@rneui/base";

const { width, height } = Dimensions.get("window");

const CustomerManageCard = ({ navigation, route }) => {
  const { cardNum, cardExpiry } = route.params;
  const [defaultState, setDefaultState] = useState(false);

  return (
    <SafeAreaComponent>
      <View
        className={`flex-row items-center justify-between
        px-[16px] space-x-[32px] border-b border-b-[#C6C6C6]`}
        style={{ paddingBottom: height * 0.1 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BackIcon} className={`w-[24px] h-[24px]`} />
        </TouchableOpacity>
        <Text className={`text-[24px] font-montserratRegular w-full`}>
          Manage card
        </Text>
      </View>

      <View
        className={`mt-[17px] px-[16px]`}
        style={{ marginBottom: height * 0.0545 }}
      >
        <NormalCardComponent
          expiry={cardExpiry}
          fourDigits={cardNum}
          style={{ height: height * 0.2 }}
        />
      </View>
      <View className={`px-[16px]`} style={{ marginBottom: height * 0.0758 }}>
        <Text className={`uppercase text-[12px] font-montserratSemiBold`}>
          Default payment method
        </Text>

        <View
          className={`flex-row items-center mt-[14px] justify-between w-full `}
        >
          <Text
            className={`text-[12px] font-montserratRegular`}
            style={{ width: width * 0.65 }}
          >
            This card is set as the default payment method for your transactions
          </Text>

          <View className={``}>
            <Switch
              value={defaultState}
              onValueChange={(value) => setDefaultState(value)}
              color={colors.primaryColor}
            />
          </View>
        </View>
      </View>

      <View className={`px-[16px]`}>
        <SquareButton
          text={"Delete"}
          styles={{ backgroundColor: colors.red }}
        />
      </View>
    </SafeAreaComponent>
  );
};

export default CustomerManageCard;

const styles = StyleSheet.create({});
