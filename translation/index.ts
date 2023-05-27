import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./resources/en";
import ro from "./resources/ro";

i18n.use(initReactI18next)
    .init({
        resources: {
            en, ro
        },
        lng:'ro',
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    })

export default i18n;