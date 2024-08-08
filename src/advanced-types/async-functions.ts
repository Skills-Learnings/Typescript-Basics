function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Hi"), duration)
  })
}

async function wait2(duration: number) {
  return await fetch("sdf")
}

wait(1000).then((value) => {
  console.log(value.length)
})
