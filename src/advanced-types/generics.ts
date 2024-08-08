// 1. Basic example
function getSecond<ArrayType>(array: ArrayType[]) {
  return array[1]
}

const a = [1, 2, 3]
const b = ["sdf", "sdf"]

const retA = getSecond<number>(a) // Explicitely passing generic.
const retB = getSecond(b) // Automatic infering of generic.

// 2. Usecases of built in generic in JS

// 2.1 Set usecase
// const val = new Set([2]) // Will automatically infer generic as number in this case
const val = new Set<number>()
val.add("string") // Error: Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)

// 2.2 Map usecase
const maps = new Map([["sdf", 3]]) // Will automatically infer generic as <string, number> in this case
const maps = new Map<string, number>([["sdf", 3]])
maps.set("test", 3)

// 3. Example of using custom types as generics
type APIResponse<T> = {
  data: T
  isError: boolean
}

type UserResponse = APIResponse<{ name: string; age: number }> // Example of using custom type as generics in other types.
type BlogResponse = APIResponse<{ title: string }>

const user: UserResponse = {
  data: {
    name: "sdf",
    age: 324,
  },
  isError: false,
}

const blog: BlogResponse = {
  data: { title: "sdfer" },
  isError: false,
}

// 4. Example of default values in generics
type APIResponse2<T = { status: number }> = {
  data: T
  isError: boolean
}

const resp: APIResponse2 = {
  data: {
    status: 200,
  },
  isError: false,
}

// 5. Example of extends generic type
type APIResponse3<T extends object = { status: number }> = {
  data: T
  isError: boolean
}

const resp3: APIResponse3 = {
  data: {
    status: 200,
  },
  isError: false,
}

// 6. Example of nested generics
type APIResponse4<T> = {
  data: T
  isError: boolean
}

const resp4: APIResponse4<Array<number>> = {
  data: [1, 2, 3],
  isError: false,
}

//

function arrayToObject<T>(array: [string, T][]) {
  const obj: {
    [index: string]: T
  } = {}

  array.forEach(([key, value]) => {
    obj[key] = value
  })

  return obj
}

const arr: [string, number | boolean][] = [
  ["keyOne", 1],
  ["keyTwo", 2],
  ["keyThree", true],
]

const obj = arrayToObject(arr)