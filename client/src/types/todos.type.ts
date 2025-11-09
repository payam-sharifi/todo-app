export type TodoStatus = 'offen' | 'in_bearbeitung' | 'erledigt';

  export interface TodoRsType {
    id:number,
    titel: string;
    beschreibung?: string;
    status: TodoStatus;
    erstellt_am:string,
    aktualisiert_am:string
  }

  


  export interface TodoRqType {
    titel: string;
    beschreibung?: string;
    status: TodoStatus;
  }

  
  export type TodoListRsDataType = TodoRsType[];
  export type UpdateTodoDto = Partial<TodoRsType>;