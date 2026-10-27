import { useEffect, useState } from "react";
import { useTranslation, Translation } from "react-i18next";
import {
  Button,
  ConfigProvider,
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Popconfirm,
  Table,
  Modal,
  Select,
  Transfer,
  Radio,
} from "antd";
import enUS from "antd/lib/locale/en_US";
import ruRu from "antd/lib/locale/ru_RU";
import moment from "moment";
import "moment/locale/ru";
import "./styles/App.less";
import Header from "./components/header";
import Language from "./components/language";

moment.locale("ru");
moment.locale("en");

const { Option } = Select;
const { RangePicker } = DatePicker;

function App() {
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState(enUS);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log(locale);
    i18n.changeLanguage(locale.locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeLocale = (e) => {
    const value = e.target.value;
    if (value && value.locale) {
      i18n.changeLanguage(value.locale);
      setLocale(value);
    }
  };

  return (
    <ConfigProvider locale={locale} className="App">
      <Header>
        <Language />
      </Header>
      <Radio.Group value={locale} onChange={changeLocale}>
        <Radio.Button key="en" value={enUS}>
          English
        </Radio.Button>
        <Radio.Button key="ru" value={ruRu}>
          Русский
        </Radio.Button>
      </Radio.Group>
      <div>{t("message")}</div>
    </ConfigProvider>
  );
}

export default App;
