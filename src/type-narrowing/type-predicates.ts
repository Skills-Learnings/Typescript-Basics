// Basic example
type Person = {
  name: string
}

type Todo = {
  title: string
}

function print(obj: Person | Todo) {
  if (isPerson(obj)) {
    console.log(obj.name)
    return
  }

  console.log(obj.title)
}

function isPerson(obj: Person | Todo): obj is Person {
  return "name" in obj
}

// Real world problem example
const PRIORITIES = ["High", "Medium", "Low"] as const
type Priority = (typeof PRIORITIES)[number]
type Todo2 = {
  title: string
  description: string
}

function func(todo: Todo2) {
  if (isPriority(todo.description)) {
    todo.description
  } else {
    todo.description
  }
}

function isPriority(description: string): description is Priority{
  return PRIORITIES.includes(description as Priority)
}