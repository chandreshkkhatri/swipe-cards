import { Locale } from "../../commons/types/i18n";
import i18n from "./i18n";

export const getTranslatedNumber = (number: number) => {
  const numberString = number.toString();

  if (i18n.locale != Locale.english) {
    var translatedNumber = numberString
      .split("")
      .map((digit) => {
        if (digit === "1") return i18n.t("1");
        if (digit === "2") return i18n.t("2");
        if (digit === "3") return i18n.t("3");
        if (digit === "4") return i18n.t("4");
        if (digit === "5") return i18n.t("5");
        if (digit === "6") return i18n.t("6");
        if (digit === "7") return i18n.t("7");
        if (digit === "8") return i18n.t("8");
        if (digit === "9") return i18n.t("9");
        if (digit === "0") return i18n.t("0");

        return digit;
      })
      .join("");

    return translatedNumber;
  } else {
    return numberString;
  }
};
