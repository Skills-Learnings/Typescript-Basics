type Person = {
  readonly id: number
  name: string
  age: number
}

const person: Person = { id: 1, name: "Kyle", age: 28 }
person.id = 2 // this will throw error for we can't update the readonly property


// Readonly example with NumberArray
type NumberArray = readonly number[]

const nums: NumberArray = [1, 2, 3]
