export default function TodoFilter() {
 
  
  
  
  
  
  return (
    <div className="flex flex-wrap gap-3 justify-center my-8 max-w-3xl mx-auto">
      <div className="flex flex-col flex-1 min-w-[200px]">
        <label className="text-gray-300 mb-1">Nach Status filtern</label>
        <select className="border-2 outline-none border-gray-500 bg-transparent text-white p-2 rounded-md focus:border-white">
          <option value="offen">Offen</option>
          <option value="in Bearbeitung">In Bearbeitung</option>
          <option value="erledigt">Erledigt</option>
        </select>
      </div>
      <div className="flex flex-col flex-1 min-w-[200px]">
        <label className="text-gray-300 mb-1">Suche nach Titel</label>
        <input
          type="text"
          placeholder="Suche nach Titel"
          className="border-2 outline-none border-gray-500 text-white placeholder-gray-500 p-2 rounded-md focus:border-white bg-transparent"
        />
      </div>
    </div>
  );
}
