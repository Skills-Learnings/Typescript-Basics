type Todo = {
  title: string
  completed: boolean
  address?: {
    street?: string
  }
}

type OptionalTodo = Partial<Todo>

type SpecificOptionalTodo = Partial<Pick<Todo, "title">> & Omit<Todo, "title">  // Example of making specific property optional.

const todo: SpecificOptionalTodo = {  // This will throw error because title is now optional.
  completed: true,
}