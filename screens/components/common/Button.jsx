import { TouchableOpacity, Text, ActivityIndicator, Platform } from "react-native";

export const RoundedButton = ({
  text,
  onPress,
  styles,
  loading,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      className={`w-[100%] 
      p-[14px] flex flex-row justify-center rounded-[40px]`}
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

export const SquareButton = ({ text, styles, onPress, loading, textStyle , disabled }) => {
  return (
    <TouchableOpacity
      className={`w-[100%] ${Platform.OS == 'ios' ? 'h-[50px]' : 'h-[45px]'} ${disabled ? 'bg-disabledBtn' : 'bg-[#0066F5]'} flex flex-row justify-center items-center rounded-[4px]`}
      style={styles}
      onPress={disabled ? () => {
        return;
      } : onPress}
    >
      {loading ? (
        <ActivityIndicator color={'#ffffff'}/>
      ) : (
        <Text
          className={`text-white  ${Platform.OS == 'ios' ? 'text-[14px]' : 'text-[12px]'}  font-semibold font-montserratBold`}
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
      className={`mt-[30px] w-[100%] 
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
      className={` w-[100%] 
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

export const LayeredBtn = ({
  text,
  styles,
  subText,
  subTextTop,
  onPress,
  textClass,
}) => {
  return (
    <TouchableOpacity
      className={`${Platform.OS == 'ios' ? 'h-[50px]' : 'h-[45px]'}  flex justify-center items-center 
      rounded-[4px] border border-[#99C2FB] shadow-lg w-[45%]`}
      style={styles}
      onPress={onPress}
    >
      <Text
        className={`${textClass} ${Platform.OS == 'ios' ? 'text-[14px]' : 'text-[12px]'} font-semibold font-montserratBold`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
