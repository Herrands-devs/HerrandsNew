import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PrimaryInput } from "../../components/common/Inputs";
import { colors } from "../../../themes/colors";
import { RoundedButton } from "../../components/common/Button";

const { width, height } = Dimensions.get("window");

const OneMoreStep = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={[
        { paddingTop: insets.top, backgroundColor: "#fff", height: "100%" },
      ]}
      className={`flex-1`}
    >
      <View style={{ height: height * 0.85 }}>
        <Text
          className={`text-[24px] font-montserratBold text-center text-black`}
          style={{ marginTop: height * 0.2 }}
        >
          One more step!
        </Text>

        <View className={`items-center mt-[40px]`}>
          <PrimaryInput
            iconName={"mail"}
            label={"Email"}
            iconColor={colors.subTitle}
            placeHolder={"Enter your email"}
            type={"email-address"}
          />
        </View>
        <View className={`items-center mt-[70px]`}>
          <RoundedButton
            text={"Let's Rock"}
            onPress={() => navigation.navigate("EnterYourNumber")}
          />
        </View>
      </View>

      <View className={`space-y-1`}>
        <View className={`flex-row items-center space-x-1 justify-center`}>
          <Text className={`text-[14px] font-montserratMedium text-subTitle`}>
            By continuing,
          </Text>
          <TouchableOpacity>
            <Text
              className={`text-[14px] font-montserratMedium text-primaryColor`}
            >
              terms of service
            </Text>
          </TouchableOpacity>
          <Text className={`text-[14px] font-montserratMedium text-subTitle`}>
            and{" "}
          </Text>
        </View>
        <View className={`items-center flex-row justify-center space-x-1`}>
          <TouchableOpacity>
            <Text
              className={`text-[14px] font-montserratMedium text-primaryColor`}
            >
              privacy policy
            </Text>
          </TouchableOpacity>
          <Text className={`text-[14px] font-montserratMedium text-subTitle`}>
            apply
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OneMoreStep;

const styles = StyleSheet.create({});
