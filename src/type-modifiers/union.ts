// Union Modifier
let id: string | number = "7" // Example of union where the id can be string of number.

id = "7"

type Person = {
  id: string | number
  isProgrammer?: boolean
}

type Todo = {
  name: string
  status: "Complete" | "Incomplete" | "Draft" // Example of union specifying the exact values that can be used for status
}

const todo: Todo = { name: "Laundary", status: "Complete" }

type TodoPerson = Todo | Person // Example of union in creating new type.
