import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

export const RoundedButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      className={`mt-[30px] bg-primaryColor w-[80%] 
      p-[12px] flex flex-row justify-center rounded-[40px]`}
      onPress={onPress}
    >
      <Text
        className={`text-white text-[14px] font-semibold font-montserratBold`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const SquareButton = ({ text, styles, onPress, loading ,textStyle }) => {
  return (
    <TouchableOpacity
      className={`w-[80%] 
      p-[14px] flex flex-row justify-center rounded-[4px]`}
      style={styles}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text
          className={`text-white text-[14px] font-semibold font-montserratBold`}
          style={textStyle}
        >
          {text}
        </Text>
      )}
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
        className={`text-white text-[14px] font-semibold font-montserratBold`}
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
        className={`text-white text-[14px] font-semibold font-montserratBold`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const LayeredBtn = ({ text, styles, subText, subTextTop, onPress }) => {
  return (
    <TouchableOpacity
      className={`p-[12px] flex 
      rounded-[4px] border border-[#99C2FB] flex-1 mx-[10px]`}
      style={styles}
      onPress={onPress}
    >
      <Text
        className={`text-white text-[14px] font-semibold font-montserratBold`}
      >
        {text}
      </Text>
      <Text
        className={`text-white text-[8px] font-semibold font-montserratBold`}
        style={{ marginTop: subTextTop }}
      >
        {subText}
      </Text>
    </TouchableOpacity>
  );
};
