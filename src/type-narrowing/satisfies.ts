type Todo = {
  title: string,
  dueDate: string | Date
  isComplete: boolean
}

const todo = {
  title: "sdf",
  dueDate: new Date(),
  isComplete: true,
} satisfies Todo

todo.dueDate.setDate(4)