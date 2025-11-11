import TodoFilterList from "./components/features/todos/TodoFilterList";
import TodoForm from "./components/features/todos/TodoForm";

function App() {
  return (
    <div className="bg-purple-950 p-2 min-h-screen flex justify-center items-center">
      <div className="max-w-[500px] w-[90%] bg-slate-900 p-4 rounded-md shadow-md flex flex-col h-[600px]">
        <h1 className=" text-center text-white text-xl mb-2">Aufgabenliste</h1>
        <TodoForm /> 
        <div className="flex-1 mt-4 overflow-hidden">
          <TodoFilterList />
        </div>
      </div>
    </div>
  );
}

export default App;
