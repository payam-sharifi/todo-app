import { useEffect } from "react";
import { driver } from "driver.js";
import type { Driver } from "driver.js";
import "driver.js/dist/driver.css";
import "@/styles/tour-styles.css";
export default function OnboardingTour() {
  useEffect(() => {
    // create tour instance
    const tour: Driver = driver({
      showProgress: true,
      //popoverClass: "",
      //overlayColor: "#ffffff",
      animate: true,
      steps: [
        {
          element: ".todo-title",
          popover: {
            title: "Titel",
            description:
              "Hier können Sie Ihren Titel eingeben, das ist notwendig",
          },
        },
        {
          element: ".todo-desc",
          popover: {
            title: "Beschreibung",
            description:
              "Der Benutzer kann eine optionale Beschreibung schreiben",
          },
        },
        {
          element: ".todo-btn-submit",
          popover: {
            title: "Submit",
            description:
              "Verwenden Sie diese Schaltfläche, um Ihre Aufgaben zu speichern.",
          },
        },

        // filter section
        {
          element: ".filter-status",
          popover: {
            title:
              "Nach Status Filtern",
            description:
              "Sie können Ihre Aufträge nach ihrem Status filtern: offen, in Bearbeitung, erledigt.",
          },
        },
        {
          element: ".title-search",
          popover: {
            title: "Suche nach Titel",
            description:
              "Indem Sie Ihren Aufgabentitel eingeben, können Sie ihn finden.",
          },
        },

        //list setion
        {
          element: ".list-section",
          popover: {
            title: "Aufgabenliste",
            description:
              "Alle Aufgaben, die auf Ihrem Filter basieren, werden hier angezeigt. Durch endloses Scrollen können Sie weitere Aufgaben laden, falls vorhanden.",
          },
        },

        //item section
        {
            element: ".isedit",
            popover: {
              title: "Aufgabenliste",
              description:
                "Wenn eine Aufgabe als aktiv gilt, wird der Status In Bearbeitung oder Offen angezeigt. Im offenen Status wird dann rechts ein „Erledigt“-Häkchen angezeigt.",
            },
          },

          {
            element: ".edit-task",
            popover: {
              title: "Aufgabe bearbeiten",
              description:
                "Sie können die Aufgabe bearbeiten, indem Sie hier klicken.",
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
              title: "Aufgabe erledigt",
              description:
                "Hier können Sie eine Aufgabe löschen.",
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
