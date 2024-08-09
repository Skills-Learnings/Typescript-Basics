type Todo = {
  title?: string
  completed: boolean
  address?: {
    street?: string
  }
}

type RequiredTodo = Required<Todo>

type SpecificRequiredTodo = Required<Pick<Todo, "title">> & Todo  // Example of making specific property required.

const todo: SpecificRequiredTodo = {   // This will throw error because title is not required.
  completed: true,
}