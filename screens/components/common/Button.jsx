import { TouchableOpacity, Text } from "react-native";

export const RoundedButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      className={`mt-[30px] bg-primaryColor w-[80%] 
      p-[12px] flex flex-row justify-center rounded-[40px]`}
      onPress={onPress}
    >
      <Text
        className={`text-white text-[14px] font-semibold font-montserratRegular`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const SquareButton = ({ text, styles, onPress }) => {
  return (
    <TouchableOpacity
      className={`w-[80%] 
      p-[12px] flex flex-row justify-center rounded-[4px]`}
      style={styles}
      onPress={onPress}
    >
      <Text
        className={`text-white text-[14px] font-semibold font-montserratRegular`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const DisabledSquareBtn = ({ text, styles }) => {
  return (
    <TouchableOpacity
      className={`mt-[30px] w-[80%] 
      p-[12px] flex flex-row justify-center rounded-[4px] bg-disabledBtn`}
      style={styles}
    >
      <Text
        className={`text-white text-[14px] font-semibold font-montserratRegular`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const DisabledRoundedBtn = ({ text, styles }) => {
  return (
    <TouchableOpacity
      className={`mt-[30px] w-[80%] 
      p-[12px] flex flex-row justify-center rounded-[40px] bg-disabledBtn`}
      style={styles}
    >
      <Text
        className={`text-white text-[14px] font-semibold font-montserratRegular`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const LayeredBtn = ({ text, styles, subText, subTextTop }) => {
  return (
    <TouchableOpacity
      className={`mt-[30px] w-[170px] 
      p-[12px] flex flex-col justify-center items-center rounded-[4px] border border-[#99C2FB]`}
      style={styles}
    >
      <Text
        className={`text-white text-[14px] font-semibold font-montserratRegular`}
      >
        {text}
      </Text>
      <Text
        className={`text-white text-[8px] font-semibold font-montserratRegular`}
        style={{ marginTop: subTextTop }}
      >
        {subText}
      </Text>
    </TouchableOpacity>
  );
};
