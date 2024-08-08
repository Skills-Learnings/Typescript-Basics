type Person = {
  name: string,
  age: number
  isProgrammer?: boolean
}

function getValue(key: keyof Person, person: Person) {
  return person[key]
}

const age = getValue("age", { name: "Sahil", age: 24})