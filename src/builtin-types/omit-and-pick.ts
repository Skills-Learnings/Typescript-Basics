// Omit example
type Todo = {
  id: string
  name: string
  status: string
  completed: boolean
}

type NewTodo = Omit<Todo, "id">

function saveTodo(todo: NewTodo): Todo {
  return { ...todo, id: crypto.randomUUID() }
}

function renderTodo(todo: Todo) {
  const div = document.createElement("div")
  div.id = todo.id
}

// Pick example
type Person = {
  id: string
  name: string
  age: number
  address: {/* dskadjfei */}
}

type SimplePerson = Pick<Person, "name" | "age">
