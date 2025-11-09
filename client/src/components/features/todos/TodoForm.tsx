import { useForm } from "react-hook-form";
import { useCreateNewTodo } from "@/hooks";
import type { TodoRqType } from "@/types/todos.type";
import { Spinner } from "@/components/common/Spinner";


export default function TodoForm() {
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
      <div className="flex flex-wrap gap-3 justify-center my-3 max-w-3xl mx-auto">
        <div className="flex flex-col flex-1 min-w-[200px]">
          <label className="text-gray-300 mb-1">Titel *</label>
          <input
            {...register("titel", { required: "Titel ist erforderlich" })}
            type="text"
            placeholder="Geben Sie den Titel ein"
            className="border-2 outline-none border-gray-500 text-white placeholder-gray-500 p-2 rounded-md focus:border-white bg-transparent"
          />
          {errors.titel && (
            <p className="text-red-400 text-sm mt-1">{errors.titel.message}</p>
          )}
        </div>

        <div className="flex flex-col flex-1 min-w-[200px]">
          <label className="text-gray-300 mb-1">Beschreibung</label>
          <input
            {...register("beschreibung")}
            type="text"
            placeholder="Optional"
            className="border-2 outline-none border-gray-500 text-white placeholder-gray-500 p-2 rounded-md focus:border-white bg-transparent"
          />
        </div>
        <div className="flex flex-col flex-4">
          <button
            type="submit"
            className="cursor-pointer bg-purple-800 rounded-md text-sm hover:bg-purple-900 text-white px-4 py-2 h-[42px] mt-auto"
          >
            {!isPending ? "Hinzufügen" : <Spinner color="white" size="sm" />}
          </button>
        </div>
      </div>



     
    </form>
  );
}
