import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// 从服务器获取配置资源
import Backend from "i18next-http-backend";
// 检测当前浏览器的语言
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import ru from "./locales/ru.json";
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    resources: { en, ru },
  });

export default i18n;
