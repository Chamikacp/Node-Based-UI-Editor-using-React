import LocalizedStrings from "react-localization";
import homeEn from "./en/home.en";

// en

// Default is en
const languageStrings = {
  ...homeEn,
};

const strings = new LocalizedStrings({
  en: languageStrings,
});

export default strings;
