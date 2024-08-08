// Usage of intersection with types
type Person = {
  name: string
  age: number
}

type PersonWithId = Person & {
  id: string
}

const person: PersonWithId = { id: "random", name: "Sahil", age: 28 }

// Usage of intersection with interfaces
interface User {
  name: string
  age: number
}

interface Todo {
  complete: boolean
}

interface UserWithId extends User, Todo {
  id: string
}

const user: UserWithId = { id: "random", name: "Sahil", age: 28, complete: true }
