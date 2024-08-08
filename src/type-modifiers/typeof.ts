
// Example of using typeof with objects and object arrays
const person = { name: "Sahil", age: 24, isProgrammer: true }
const people: (typeof person)[] = []

people.push(person)
people.push({ name: "Sahil", age: 25, isProgrammer: false })
people.push(2)

// Example of using typeof with functions
function sayHi(name: string) {
  console.log(name)
}

typeof FuncType = typeof sayHi
