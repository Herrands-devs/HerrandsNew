import { TouchableOpacity, Text } from "react-native";

export const RoundedButton = ({ text }) => {
  return (
    <TouchableOpacity
      className={`mt-[30px] bg-primaryColor w-[80%] 
      p-[12px] flex flex-row justify-center rounded-[40px]`}
    >
      <Text className={`text-white text-[14px] font-semibold`}>{text}</Text>
    </TouchableOpacity>
  );
};

export const SquareButton = ({ text, styles }) => {
  return (
    <TouchableOpacity
      className={`mt-[30px] w-[80%] 
      p-[12px] flex flex-row justify-center rounded-[4px]`}
      style={styles}
    >
      <Text className={`text-white text-[14px] font-semibold`}>{text}</Text>
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
      <Text className={`text-white text-[14px] font-semibold`}>{text}</Text>
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
      <Text className={`text-white text-[14px] font-semibold`}>{text}</Text>
    </TouchableOpacity>
  );
};
