// CustomAlert.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';

const { width } = Dimensions.get('window');

const CustomAlert = ({
  visible = false,
  title = '提示',
  message = '',
  buttons = [],
  onBackdropPress = false,
  onBackButtonPress = false,
  animationIn = 'fadeIn',
  animationOut = 'fadeOut',
}) => {
  // 默认按钮配置
  const defaultButtons = [
    {
      text: '确定',
      onPress: () => {},
      style: 'default', // default, cancel, destructive
    },
  ];

  const finalButtons = buttons.length > 0 ? buttons : defaultButtons;

  // 获取按钮样式
  const getButtonStyle = buttonStyle => {
    switch (buttonStyle) {
      case 'cancel':
        return styles.cancelButton;
      case 'destructive':
        return styles.destructiveButton;
      default:
        return styles.defaultButton;
    }
  };

  const getButtonTextStyle = buttonStyle => {
    switch (buttonStyle) {
      case 'cancel':
        return styles.cancelButtonText;
      case 'destructive':
        return styles.destructiveButtonText;
      default:
        return styles.defaultButtonText;
    }
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      onBackButtonPress={onBackButtonPress}
      animationIn={animationIn}
      animationOut={animationOut}
      backdropOpacity={0.5}
      style={styles.modal}
      useNativeDriver={true}
    >
      <View style={styles.alertContainer}>
        {/* 标题 */}
        {title && <Text style={styles.title}>{title}</Text>}

        {/* 消息内容 */}
        {message && <Text style={styles.message}>{message}</Text>}

        {/* 按钮组 */}
        <View style={styles.buttonContainer}>
          {finalButtons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                getButtonStyle(button.style),
                index === finalButtons.length - 1 && styles.lastButton,
                finalButtons.length === 1 && styles.singleButton,
              ]}
              onPress={button.onPress}
              activeOpacity={0.7}
            >
              <Text style={getButtonTextStyle(button.style)}>
                {button.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: width * 0.7,
    backgroundColor: '#fff',
    borderRadius: 13,
    overflow: 'hidden',
    paddingVertical: 20,
    paddingHorizontal: 16,
    // iOS 阴影
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android 阴影
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#e5e5e5',
    marginHorizontal: -16,
    marginBottom: -20,
    marginTop: 4,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 0.5,
    borderRightColor: '#e5e5e5',
  },
  lastButton: {
    borderRightWidth: 0,
  },
  singleButton: {
    borderRightWidth: 0,
  },
  defaultButton: {
    backgroundColor: '#fff',
  },
  cancelButton: {
    backgroundColor: '#f8f8f8',
  },
  destructiveButton: {
    backgroundColor: '#fff',
  },
  defaultButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007aff',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8e8e93',
  },
  destructiveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ff3b30',
  },
});

export default CustomAlert;
