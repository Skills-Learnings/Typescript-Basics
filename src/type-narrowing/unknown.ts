function func(data: unknown) {
  if (
    data != null &&
    typeof data === "object" &&
    "name" in data &&
    typeof data.name === "string"
  ) {
    console.log(data.name.length)
  }
}
