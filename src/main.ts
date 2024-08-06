// Basic types
let a: number
a = "hello" // This will give error because we can't assign string to a variable declared as number

let b: string
b = true // This will also give error.

// Type inference
let num = 4 // This will infer the type from value assigned and will automatically consider it as a number type.

let str = "world" // This will automatically consider it as a string type

const variable = "hello" // As it is a const variable its value can't be change once assigned so it will consider the value itself as a type.

// Array type
let numArray: number[]
numArray = [1, 2, 4]

let numArray2 = [1, 2, 3] // Typescript will infer it as an number array in this case

// Any Type
let anyVar: any = 4

anyVar = 3 // Correct
anyVar = "sdf" // Correct

// Objects in TS
const person = { name: "Sahil", age: 24 } // in this case TS will automtically infer type as string and number for name and age properties
person.isProgrammer = true // this will throw an error because we have not added property in the object which we are trying to access.

const programmer: { name: string; age: number; isProgrammer?: boolean } = {
  name: "Sahil",
  age: 24,
}
programmer.isProgrammer = true // this will not throw erroe because we have made the isProgrammer property as optional in the object type above.

// Types vs Interfaces
type User = {
  name: string
  age: number
  isProgrammer?: boolean
  friends: []
  address: {
    street: string
  }
}

const user: User =  {name: "User 1", age: 24, friends: [], address: {street: "Main street"}}

const user2: User =  {name: "User 3", age: 26, isProgrammer: true, friends: [], address: {street: "Main street"}}

