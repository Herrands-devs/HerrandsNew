import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Easing,
  Modal,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import BackIcon from "../../../assets/icons/back-icon-black.png";
import {
  NoCardComponent,
  NormalCardComponent,
} from "../../components/customer-home-screen/PaymentCards";
import AddIcon from "../../../assets/icons/add-icon.png";
import NoCardModal from "../../components/customer-home-screen/NoCardModal";
import { GlobalContext } from "../../../context/context.store";

const { width, height } = Dimensions.get("window");

const CustomerPayments = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { cards } = useContext(GlobalContext);

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <>
      <SafeAreaComponent>
        <View
          className={`flex-row items-center justify-between 
        px-[16px] space-x-2 border-b border-b-[#C6C6C6]`}
          style={{ paddingBottom: height * 0.1 }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className={`flex-1`}
          >
            <Image source={BackIcon} className={`w-[24px] h-[24px]`} />
          </TouchableOpacity>
          <Text
            className={`text-[24px] font-montserratBold w-full text-center`}
          >
            Payment
          </Text>
        </View>

        <View
          className={`px-[16px] mt-[12px]`}
          style={{ marginBottom: height * 0.327 }}
        >
          <View>
            <Text
              className={`uppercase text-[12px] text-primaryColor font-montserratSemiBold`}
              style={{ marginBottom: height * 0.048 }}
            >
              Debit cards
            </Text>

            <View>
              {cards.length !== 0 ? (
                <View>
                  {cards.map((card, i) => (
                    <NormalCardComponent
                      key={i}
                      style={{ height: height * 0.2, marginVertical: 20 }}
                      fourDigits={String(card.cardNum).slice(-4)}
                      expiry={card.cardExpiry}
                      onPress={() =>
                        navigation.navigate("CustomerManageCard", {
                          cardNum: String(card.cardNum).slice(-4),
                          cardExpiry: card.cardExpiry,
                        })
                      }
                    />
                  ))}
                </View>
              ) : (
                <NoCardComponent
                  style={{ height: height * 0.2 }}
                  onPress={() => setIsVisible(true)}
                />
              )}
            </View>
          </View>
        </View>

        <View className={`flex-row justify-end px-[16px] shadow-sm mb-[80px]`}>
          <TouchableOpacity
            className={`bg-[#F7F7F7] p-[14px] rounded-full`}
            onPress={() => navigation.navigate("CustomerAddCard")}
          >
            <Image source={AddIcon} className={`w-[24px] h-[24px]`} />
          </TouchableOpacity>
        </View>

        <NoCardModal isVisible={isVisible} closeModal={closeModal} />
      </SafeAreaComponent>
    </>
  );
};

export default CustomerPayments;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
  },
});
