import { StyleProp, TextStyle } from 'react-native';
import { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';

const textStyle: StyleProp<TextStyle> = {
  fontSize: 16,
  fontWeight: '400'
};

const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'black' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={textStyle}
      text2Style={textStyle}
    />
  ),
  
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={textStyle}
      text2Style={textStyle}
    />
  ),
};

export default toastConfig;
