// Defining Functions

/* Example of assigning types to function parameters */
function printName(name: string, name2: string) {
  console.log(name, name2)
}

/* Example of return type automatically inferred by typescript based on function declaration */
function sum(a: number, b: number) {
  return a + b
}

const c = sum(1, 2) // In TS we should avoid explicitly declaring a return type if it workd perfectly fine with automatic type inference.

// Passing objects to function
function printPerson(person: { name: string }) {
  console.log(person.name)
}

printPerson({ name: "Kyle" })

// Void Type
function logMessage(message: string): void {
  console.log(message)
}

// Optional Parameters
function printNameAndAge(name: string, options?: { debugMode: boolean }) {
  console.log(name, options)
}

printNameAndAge("sdf") // This will not throw error because we have declared options parameter as optional.

// Destructured and Rest Parameters
type Options = {
  debugMode?: boolean
  indentLevel?: number
}

function printNameAndAge2(
  name: string,
  { debugMode = false, indentLevel }: Options = {}
) {
  console.log(name, debugMode, indentLevel)
}

printNameAndAge2("sdf")

// Typing variables as functions
function sumWithCallback(a: number, b: number, cb: (sum: number) => void) {
  cb(a + b)
}

sumWithCallback(1, 2, (sum) => {
  console.log(sum)
})
