import { useForm } from "react-hook-form";
import { useCreateNewTodo } from "@/hooks";
import type { TodoRqType } from "@/types/todos.type";
import { Spinner } from "@/components/common/Spinner";
import { useTranslation } from "react-i18next";


export default function TodoForm() {
  const { t } = useTranslation();
  const { mutate: CreateTodoItem, isPending } = useCreateNewTodo();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoRqType>({
    defaultValues: {
      titel: "",
      beschreibung: "",
      status: "offen",
    },
  });

  const onSubmit = (newTodo: TodoRqType) => {
    CreateTodoItem(newTodo);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap gap-3 justify-center my-1 max-w-3xl mx-auto">
        <div className="flex flex-col todo-title flex-1 min-w-[200px]">
          <label className="text-gray-300 mb-1 font-bold text-xs">{t("Titel")} *</label>
          <input
            {...register("titel", { required: t("Titel_ist_erforderlich") })}
            type="text"
            placeholder={t("Geben_Sie_den_Titel_ein")}
            className="border-2 outline-none  border-gray-500 text-xs text-white placeholder-gray-500 p-2 rounded-md focus:border-white bg-transparent"
          />
          {errors.titel && (
            <p className="text-red-400 text-xs mt-1">{errors.titel.message}</p>
          )}
        </div>

        <div className="flex flex-col flex-1 todo-desc min-w-[200px]">
          <label className="text-gray-300 font-bold mb-1 text-xs">{t("Beschreibung")}</label>
          <input
            {...register("beschreibung")}
            type="text"
            placeholder={t("Optional")}
            className="border-2 text-xs outline-none border-gray-500 text-white placeholder-gray-500 p-2 rounded-md focus:border-white bg-transparent"
          />
        </div>
        <div className="flex flex-col todo-btn-submit flex-4">
          <button
            type="submit"
            className="cursor-pointer  font-bold bg-purple-800 rounded-md text-sm hover:bg-purple-900 text-white px-4 py-2 h-[35px] mt-auto"
          >
            {!isPending ? t("Hinzufügen") : <Spinner color="white" size="sm" />}
          </button>
          
        </div>
      </div>



     
    </form>
  );
}
