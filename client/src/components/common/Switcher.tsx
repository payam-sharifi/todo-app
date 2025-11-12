import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <div className="flex gap-2 mb-4">
      <button onClick={() => changeLanguage("en")} className="px-3 py-1 bg-gray-200 rounded">
        English
      </button>
      <button onClick={() => changeLanguage("de")} className="px-3 py-1 bg-gray-200 rounded">
        Deutsch
      </button>
    </div>
  );
}
