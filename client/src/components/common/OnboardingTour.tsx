import { useEffect } from "react";
import { driver } from "driver.js";
import type { Driver } from "driver.js";
import "driver.js/dist/driver.css";
import "@/styles/tour-styles.css";
import { useTranslation } from "react-i18next";
export default function OnboardingTour() {
  const { t } = useTranslation();
  useEffect(() => {
    const tour: Driver = driver({
      nextBtnText: t("next"),
      prevBtnText: t("prev"),
      doneBtnText: t("done"),
      animate: true,
      steps: [
        {
          element: ".lang",
          popover: {
            title: t("change_lang"),
            description: t("change_lang_hier"),
          },
        },
        {
          element: ".todo-title",
          popover: {
            title: t("Titel"),
            description: t(
              "Hier_können_Sie_Ihren_Titel_eingeben,_das_ist_notwendig"
            ),
          },
        },
        {
          element: ".todo-desc",
          popover: {
            title: t("Beschreibung"),
            description: t(
              "Der_Benutzer_kann_eine_optionale_Beschreibung_schreiben"
            ),
          },
        },
        {
          element: ".todo-btn-submit",
          popover: {
            title: t("Einreichen"),
            description: t(
              "Verwenden_Sie_diese_Schaltfläche,_um_Ihre_Aufgaben_zu_speichern."
            ),
          },
        },

        // filter section
        {
          element: ".filter-status",
          popover: {
            title: t("Nach_Status_Filtern"),
            description: t(
              "Sie_können_Ihre_Aufträge_nach_ihrem_Status_filtern:_offen,_in_Bearbeitung,_erledigt."
            ),
          },
        },
        {
          element: ".title-search",
          popover: {
            title: t("Suche_nach_Titel"),
            description: t(
              "Indem_Sie_Ihren_Aufgabentitel_eingeben,_können_Sie_ihn_finden."
            ),
          },
        },

        //list setion
        {
          element: ".list-section",
          popover: {
            title: t("Aufgabenliste"),
            description: t("Alle_Aufgaben"),
          },
        },

        //item section
        {
          element: ".isedit",
          popover: {
            title: t("Zum_Aktivieren_klicken"),
            description: t(
              "Wenn_eine_Aufgabe_als_aktiv_gilt,_wird_der_Status_In_Bearbeitung_oder_Offen_angezeigt._Im_offenen_Status_wird_dann_rechts_ein_Erledigt-Häkchen_angezeigt."
            ),
          },
        },

        {
          element: ".edit-task",
          popover: {
            title: t("Aufgabe_bearbeiten"),
            description: t(
              "Sie_können_die_Aufgabe_bearbeiten,_indem_Sie_hier_klicken."
            ),
          },
        },

        //   {
        //     element: ".task-done",
        //     popover: {
        //       title: "Aufgabe erledigt",
        //       description:
        //         "Hier können Sie zwischen dem Status Erledigt und In Bearbeitung wechseln.",
        //     },
        //   },

        {
          element: ".handleDelete",
          popover: {
            title: t("Aufgabe_erledigt"),
            description: t("Hier_können_Sie_eine_Aufgabe_löschen."),
          },
        },
      ],
    });

    tour.drive();

    return () => {
      tour.destroy();
    };
  }, []);

  return null;
}
