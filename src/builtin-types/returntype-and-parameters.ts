function checkLength(a: string, b: number) {
  return a.length < b
}

type ReturnOfCheckLength = ReturnType<typeof checkLength>
type Params = Params<typeof checkLength>