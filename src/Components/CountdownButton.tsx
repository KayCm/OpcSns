import React, {
    useState,
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
} from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

// 定义 ref 可调用的方法
export interface CountdownButtonHandle {
    /** 手动开始倒计时（从 initialSeconds 开始） */
    start: () => void;
    /** 重置倒计时状态（停止计时，恢复到初始状态） */
    reset: () => void;
}

interface CountdownButtonProps {
    /** 初始倒计时秒数，默认60 */
    initialSeconds?: number;
    /** 按钮点击时的回调函数，通常用于发送验证码请求 */
    onPress: () => void;
    /** 按钮普通状态下的文字，默认“获取验证码” */
    normalText?: string;
    /** 倒计时进行中的文字模板，{time} 会被替换为剩余秒数，默认“{time}秒后重试” */
    countingText?: string;
    /** 自定义按钮样式 */
    buttonStyle?: ViewStyle;
    /** 自定义按钮文字样式 */
    textStyle?: TextStyle;
    /** 是否禁用按钮（可外部控制），默认false */
    disabled?: boolean;
    /** 按钮禁用时的样式覆盖 */
    disabledStyle?: ViewStyle;
    /** 按钮禁用时的文字颜色 */
    disabledTextStyle?: TextStyle;
}

const CountdownButton = forwardRef<CountdownButtonHandle, CountdownButtonProps>(
    (
        {
            initialSeconds = 60,
            onPress,
            normalText = '获取验证码',
            countingText = '{time}秒后重试',
            buttonStyle,
            textStyle,
            disabled = false,
            disabledStyle,
            disabledTextStyle,
        },
        ref
    ) => {
        const [count, setCount] = useState(initialSeconds);
        const [isCounting, setIsCounting] = useState(false);
        const timerRef = useRef<NodeJS.Timeout | null>(null);

        // 清理定时器
        const clearTimer = () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };

        // 开始倒计时（内部逻辑，不触发 onPress）
        const startCountdown = () => {
            // 如果已经在倒计时，先清理再重新开始
            clearTimer();
            setIsCounting(true);
            setCount(initialSeconds);
        };

        // 重置倒计时
        const resetCountdown = () => {
            clearTimer();
            setIsCounting(false);
            setCount(initialSeconds);
        };

        // 暴露方法给父组件
        useImperativeHandle(ref, () => ({
            start: startCountdown,
            reset: resetCountdown,
        }));

        // 处理按钮点击
        const handlePress = () => {
            if (isCounting || disabled) return;
            onPress(); // 触发外部发送验证码逻辑
            // startCountdown(); // 自动开始倒计时
        };

        // 倒计时逻辑
        useEffect(() => {
            if (isCounting) {
                timerRef.current = setInterval(() => {
                    setCount((prev) => {
                        if (prev <= 1) {
                            clearTimer();
                            setIsCounting(false);
                            return initialSeconds; // 重置为初始值，便于下次使用
                        }
                        return prev - 1;
                    });
                }, 1000);
            }
            return clearTimer;
        }, [isCounting, initialSeconds]);

        // 组件卸载时清理定时器
        useEffect(() => {
            return clearTimer;
        }, []);

        // 计算按钮显示文字
        const buttonText = isCounting
            ? countingText.replace('{time}', String(count))
            : normalText;

        // 是否禁用（内部倒计时中 或 外部传入disabled）
        const isDisabled = isCounting || disabled;

        return (
            <TouchableOpacity
                style={[
                    styles.button,
                    buttonStyle,
                    isDisabled && (disabledStyle || styles.buttonDisabled),
                ]}
                onPress={handlePress}
                disabled={isDisabled}
                activeOpacity={0.7}
            >
                <Text
                    style={[
                        styles.text,
                        textStyle,
                        isDisabled && (disabledTextStyle || styles.textDisabled),
                    ]}
                >
                    {buttonText}
                </Text>
            </TouchableOpacity>
        );
    }
);

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        height:40,
        backgroundColor: '#1890ff',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#f5f5f5',
        borderColor: '#d9d9d9',
    },
    text: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    textDisabled: {
        color: '#bfbfbf',
    },
});

export default CountdownButton;
