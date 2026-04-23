import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

import en from './locales/en.json';
import zh from './locales/zh.json';

const resources = {
    en: { translation: en },
    zh: { translation: zh }
};

// 获取设备首选语言，如果没有匹配则回退到 'en'
const getLanguage = () => {
    const locales = getLocales();
    if (locales.length > 0) {
        const langCode = locales[0].languageCode;
        if (resources[langCode]) {
            return langCode;
        }
    }
    return 'en';
};

i18n.use(initReactI18next) // 将 i18n 实例传递给 react-i18next
    .init({
        resources,
        lng: 'zh',// getLanguage(), // 初始语言
        fallbackLng: 'zh', // 回退语言
        interpolation: {
            escapeValue: false, // React 已经安全转义
        },
        react: {
            useSuspense: false, // React Native 中 Suspense 可能不可用，建议关闭
        },
    });

export default i18n;
