type Todo = {
  title: string
  priority: "High" | "Normal" | "Low"
  isComplete: boolean
  description?: string
  dueDate: Date | string
}

function extendTodo(todo: Todo) {
  // Type check for primitive types
  /* if (typeof todo.dueDate === "string") {
    console.log(todo.dueDate) // Here type would be string
  } else {
    console.log(todo.dueDate) // Here type would be date
  } */

  // Type check for non primitive types like objects or classes.
  if (todo.dueDate instanceof Date) {
    // Does something
    return
  }

  console.log(todo.dueDate) // Here type would be string as the TS will automtically infer it to string as per ts control flow.

  todo.description?.length // Checking optional properties are undefined by adding a question mark at the end of property.

  switch (todo.priority) { // Narrowing down types using switch
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
      break;
  }
}

const form = document.querySelector<HTMLFormElement>(".form")
form?.addEventListener("submit", () => {})
