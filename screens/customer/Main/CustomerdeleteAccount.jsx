import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import CloseIcon from "../../../assets/icons/resend-close.png";
import { SquareButton } from "../../components/common/Button";
import { colors } from "../../../themes/colors";

const { width, height } = Dimensions.get("window");

const CustomerdeleteAccount = ({ navigation }) => {
  return (
    <SafeAreaComponent classes={`px-[16px]`}>
      <View
        className={`flex-row items-center justify-between`}
        style={{ marginBottom: height * 0.061 }}
      >
        <Text className={`text-[24px] font-montserratBold text-black`}>
          Delete account
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={CloseIcon} className={`w-[24px] h-[24px]`} />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: height * 0.58 }}>
        <Text
          className={`text-[16px] font-montserratRegular text-black leading-[21px]`}
        >
          We wish you wouldn't leave us 💔 Deleting your account means all your
          data will be erased. Are you sure you want to delete your account?
        </Text>
      </View>

      <View>
        <SquareButton
          text={"Delete account"}
          styles={{ backgroundColor: colors.red }}
        />
      </View>
    </SafeAreaComponent>
  );
};

export default CustomerdeleteAccount;

const styles = StyleSheet.create({});
