import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataSelector, toggleModal } from "../../../reducers/dataReducer";
import RoutinIcon from "../../../assets/icons/routine-ride.png";
import CartIcon from "../../../assets/icons/cart-icon.png";
import SocialIcon from "../../../assets/icons/social-icon.png";
import OfficeIcon from "../../../assets/icons/office-icon.png";
import HouseIcon from "../../../assets/icons/house-icon.png";
import Svg, { Circle, Path } from "react-native-svg";
import { fetchSubCategories } from "../../../helpers/fetchData";
import Placeholder from "../common/Skeleton";
import isEmpty from "../isEmpty";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../../../context/context.store";

const CategoryButton = () => {
  const navigation = useNavigation();
  const { categories, subcategories } = useSelector(DataSelector);
  const [subcategory, setSubcategory] = useState([]);
  const [select, setSelect] = useState(1);
  const { setCategoryId , setSubTypeId } =useContext(GlobalContext);
  const dispatch = useDispatch();
  useEffect(() => {
    const filteredArray = subcategories.filter(
      (item) => item.category === select
    );
    setSubcategory(filteredArray);
  }, [select]);
  return (
    <View className="w-full flex space-y-[20px] pb-[50px] mt-[20px]">
      <View>
        <Text className="text-[20px] font-montserratBold">Select Category</Text>
      </View>
      <View className="flex-row w-full justify-between">
        {isEmpty(categories) ? (
          <Placeholder />
        ) : (
          categories?.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelect(item.id);
                  setCategoryId(item.id)
                }}
                key={index}
                className={`w-[30%] ${
                  item.id !== select ? "bg-[#0363e94c]" : "bg-[#0066F5] "
                }  relative rounded-lg shadow-lg flex justify-center items-center  space-y-1  h-[70px]`}
              >
                <View className="absolute w-[10px] h-[10px] rounded-full right-0 top-0 bg-[#ffffff]" />
                <Image
                  source={
                    item.name === "Routine errands"
                      ? RoutinIcon
                      : item.name === "Outdoor errands"
                      ? CartIcon
                      : item.name === "Virtual errands"
                      ? OfficeIcon
                      : item.name === "Household errand"
                      ? HouseIcon
                      : null
                  }
                  className={`w-[24px] h-[20px]`}
                />
                <Text
                  className={`text-[12px] ${
                    item.id !== select ? "text-[#fff]" : "text-[#ffffff]"
                  } font-montserratSemiBold}`}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })
        )}
      </View>
      <View className="flex space-y-[60px] pt-[20px]">
        {subcategory?.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSubTypeId(item.id);
                navigation.navigate("Transport");
              }}
              className={`relative  shadow-md h-[80px] ${Platform.OS == 'ios' ? 'bg-white' : 'bg-[#ebeaea] rounded-md'}`}
              key={index}
            >
              <Svg height="100%" width="30%" viewBox="0 0 1440 320">
                <Circle cx="30%" cy="0%" r="50%" fill="#0066F5" />
              </Svg>
              <View className="absolute left-8 top-5">
                <Text className="text-[30px] text-white font-montserratBold">
                  {index + 1}
                </Text>
              </View>
              <View className="w-[75%] p-3 space-y-[5px] h-full absolute right-0">
                <Text className="text-[16px]">{item.name}</Text>
                <Text className="font-montserratRegular text-[12px]">
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({});
