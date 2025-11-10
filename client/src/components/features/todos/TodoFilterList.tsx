import { useEffect, useState } from "react";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";

export default function TodoFilterList() {
  const [status, setStatus] = useState("offen");
  const [title, setTitle] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTitle(title);
    }, 500); 

    return () => clearTimeout(timer);
  }, [title]);

  return (
    <div className="flex flex-col h-full">
      <TodoFilter
        status={status}
        onStatusChange={setStatus}
        title={title}
        onTitleChange={setTitle}
      />
      <div className="flex-1 overflow-hidden">
        <TodoList status={status} title={debouncedTitle} />
      </div>
    </div>
  );
}
