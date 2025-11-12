import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "de" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <div className="lang flex gap-2 mb-4">
      <GrLanguage
        className="cursor-pointer text-white text-xl hover:text-purple-400 transition-colors"
        onClick={toggleLanguage}
      />
    </div>
  );
}
