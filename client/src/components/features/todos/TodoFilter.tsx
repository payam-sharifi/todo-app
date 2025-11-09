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
 

 

  return (
    <div className="flex flex-wrap gap-3 justify-center my-3 max-w-3xl ">
      <div className="flex flex-col flex-1 min-w-[200px]">
        <label className="text-gray-300 mb-1">Nach Status filtern</label>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="border-2 outline-none border-gray-500 bg-transparent text-white p-2 rounded-md focus:border-white"
        >
          <option value="">All</option>
          <option value="offen">Offen</option>
          <option value="in_bearbeitung">In Bearbeitung</option>
          <option value="erledigt">Erledigt</option>
        </select>
      </div>

      <div className="flex flex-col flex-1 min-w-[200px]">
        <label className="text-gray-300 mb-1">Suche nach Titel</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Suche nach Titel"
          className="border-2 outline-none border-gray-500 text-white placeholder-gray-500 p-2 rounded-md focus:border-white bg-transparent"
        />
      </div>
    </div>
  );
}
