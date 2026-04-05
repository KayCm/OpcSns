import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

/**
 * 整数评分组件（React Native）
 * @param {number} value - 当前评分（1-5），0 表示未评分
 * @param {function} onChange - 分值变化回调 (newValue: number) => void
 * @param {string} activeImg - 选中状态图片的 URL（本地或网络）
 * @param {string} inactiveImg - 未选中状态图片的 URL
 * @param {boolean} readOnly - 是否为只读模式（仅展示，不可点击）
 * @param {number} size - 图片尺寸（宽度=高度），默认 40
 * @param {number} gap - 图片之间的间距，默认 8
 */
export default function Rating({
                                   value = 0,
                                   onChange,
                                   activeImg,
                                   inactiveImg,
                                   readOnly = false,
                                   size = 40,
                                   gap = 8,
                               }) {
    const handlePress = (score) => {
        if (readOnly) return;
        if (onChange) {
            onChange(score);
        }
    };

    return (
        <View style={[styles.container, { gap }]}>
            {[1, 2, 3, 4, 5].map((score) => (
                <TouchableOpacity
                    key={score}
                    onPress={() => handlePress(score)}
                    disabled={readOnly}
                    activeOpacity={readOnly ? 1 : 0.7}
                >
                    <Image
                        source={score <= value ? activeImg : inactiveImg}
                        style={{ width: size, height: size }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
