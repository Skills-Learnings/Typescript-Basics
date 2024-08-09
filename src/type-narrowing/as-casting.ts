type Todo = {
  title: string
}

function func(data: unknown) {
  fetch("sdf")
    .then((res) => res.json())
    .then((data) => {
      return data as Todo
    }).then(todo => {})
}
