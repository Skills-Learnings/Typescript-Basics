type Todo = {
  title: string
  priority: "High" | "Normal" | "Low"
  isComplete: boolean
  description?: string
  dueDate: Date | string
}

function extendTodo(todo: Todo) {
  // Narrowing down types using switch
  switch (todo.priority) {
    case "High":
      console.log(todo.priority)
      break
    case "Normal":
      console.log(todo.priority)
      break
    case "Low":
      console.log(todo.priority)
      break
    default:
      console.log(todo.priority) // Here type would be never because we have already checked all the possiblities.
  }
}
