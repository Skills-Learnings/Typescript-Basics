type Todo = {
  name: string;
  completed: boolean;
};
const todo = {
  name: "sdf",
  completed: false,
} as const; // `as const` makes the object properties read-only as well but it works only with JS objects or variables.
type FinalTodo = Readonly<Todo>;
