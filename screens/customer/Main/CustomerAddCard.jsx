import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import BackIcon from "../../../assets/icons/back-icon-black.png";
import PaymentInput from "../../components/Payment/PaymentInput";
import SecureIcon from "../../../assets/icons/secure-icon.png";
import { SquareButton } from "../../components/common/Button";
import { colors } from "../../../themes/colors";
import { GlobalContext } from "../../../context/context.store";

const { width, height } = Dimensions.get("window");

const CustomerAddCard = ({ navigation }) => {
  const [cardNum, setCardNum] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const { setCards, cards } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const handleCVVChange = (text) => {
    const cleanedCVV = text.replace(/[^0-9]/g, "");

    if (cleanedCVV.length <= 4) {
      setCvv(cleanedCVV);
    }
  };

  const handleExpiryChange = (text) => {
    const cleanedExpiry = text.replace(/[^0-9]/g, "");

    if (cleanedExpiry.length === 0) {
      // Handle empty input gracefully
      setCardExpiry("");
    } else {
      // Format the input as "MM/YYYY"
      let formattedExpiry = "";
      if (cleanedExpiry.length >= 2) {
        formattedExpiry += cleanedExpiry.substring(0, 2);
        if (cleanedExpiry.length > 2) {
          formattedExpiry += "/" + cleanedExpiry.substring(2);
        }
      }

      // Limit the length to 7 characters (MM/YYYY)
      if (formattedExpiry.length <= 7) {
        setCardExpiry(formattedExpiry);
      }
    }
  };

  const saveCard = () => {
    const data = {
      cardNum: cardNum,
      cardExpiry: cardExpiry,
      cvv: cvv,
    };
    setLoading(true);

    setTimeout(() => {
      setCards([...cards, data]);
      navigation.navigate("CustomerPayments");
      setLoading(false);
    }, 3000);
  };

  return (
    <SafeAreaComponent>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className={`flex-1 px-[16px]`}
        style={{ marginBottom: height * 0.0439 }}
      >
        <Image source={BackIcon} className={`w-[24px] h-[24px]`} />
      </TouchableOpacity>

      <View className={`px-[16px]`}>
        <Text className={`text-[24px] font-montserratBold w-full`}>
          Add your debit card
        </Text>
        <Text
          className={`mt-[13px] text-[12px] font-montserratRegular`}
          style={{ marginBottom: height * 0.0758 }}
        >
          We may use this card as the default payment method for your
          transactions.
        </Text>

        <View style={{ marginBottom: height * 0.162 }}>
          <PaymentInput
            label={"Card Number"}
            helperPosition={"end"}
            helperText={"0/23"}
            iconName={"creditcard"}
            style={{ marginBottom: height * 0.0451 }}
            value={cardNum}
            onChangeText={(text) => setCardNum(text)}
          />
          <View
            className={`flex-row items-center justify-between space-x-[54px]`}
          >
            <PaymentInput
              label={"Expiry Date"}
              helperPosition={"start"}
              helperText={"MM/YY"}
              iconName={"calendar"}
              style={{ flex: 1 }}
              value={cardExpiry}
              onChangeText={(text) => setCardExpiry(text)}
              maxLength={7}
            />
            <PaymentInput
              label={"CVV"}
              helperPosition={"end"}
              helperText={"0/3"}
              iconName={"lock"}
              style={{ flex: 1 }}
              value={cvv}
              onChangeText={handleCVVChange}
              maxLength={3}
            />
          </View>
        </View>

        <View style={{ marginBottom: height * 0.0604 }}>
          <View className={`flex-row items-center space-x-1 justify-center`}>
            <Image source={SecureIcon} className={`w-[24px] h-[24px]`} />
            <Text className={`text-[14px] text-black font-montserratSemiBold`}>
              Secured payment
            </Text>
          </View>
          <Text
            className={`mt-[14px] text-center font-montserratRegular text-[14px]`}
          >
            Your card is secured by Paystack.
          </Text>
        </View>

        <View>
          <SquareButton
            text={"Save card"}
            styles={{ backgroundColor: colors.primaryColor }}
            onPress={saveCard}
            loading={loading}
          />
        </View>
      </View>
    </SafeAreaComponent>
  );
};

export default CustomerAddCard;

const styles = StyleSheet.create({});
