import { useTranslation } from "react-i18next";

interface TodoFilterProps {
  status: string;
  title: string;
  onStatusChange: (value: string) => void;
  onTitleChange: (value: string) => void;
}
export default function TodoFilter({
  status,
  title,
  onStatusChange,
  onTitleChange,
}: TodoFilterProps) {
  const {t}=useTranslation()

 

  return (
    <div className="flex flex-wrap gap-3 justify-center my-3 max-w-3xl ">
      <div className="flex filter-status flex-col flex-1 min-w-[200px]">
        <label className="text-gray-300 text-xs font-bold  mb-1">{t("Nach_Status_Filtern")}</label>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="text-xs border-2 outline-none border-gray-500 bg-transparent text-white p-2 rounded-md focus:border-white"
        >
          {/* <option value="">All</option> */}
          <option value="offen">{t("Offen")}</option>
          <option value="in_bearbeitung">{t("In_Bearbeitung")}</option>
          <option value="erledigt">{t("Erledigt")}</option>
        </select>
      </div>

      <div className="flex title-search flex-col flex-1 min-w-[200px]">
        <label className="text-gray-300 mb-1 font-bold text-xs">{t("Suche_nach_Titel")}</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder={t("Suche_nach_Titel")}
          className="border-2 text-xs outline-none border-gray-500 text-white placeholder-gray-500 p-2 rounded-md focus:border-white bg-transparent"
        />
      </div>
    </div>
  );
}
