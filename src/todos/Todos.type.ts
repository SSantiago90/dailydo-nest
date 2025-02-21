export type TodosType = {
  date: Date,
  id: string,
  task: string,
  done: boolean,
  isNote: 0 | 1 | 2 | 3,
  userId: string,
};