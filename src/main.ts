import "./styles.css"

const form = document.querySelector<HTMLFormElement>("#new-todo-form")!
const todoList = document.querySelector<HTMLUListElement>("#list")!
const todoInput = document.querySelector<HTMLInputElement>("#todo-input")!

type Todo = {
  id: string,
  name: string,
  complete: boolean,
}

let todos = getTodos()
todos.forEach(renderNewTodo)

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const todoName = todoInput.value
  if (todoName === null) return
  const newTodo = {
    id: crypto.randomUUID(),
    name: todoName,
    complete: false,
  }

  todos.push(newTodo)
  renderNewTodo(newTodo)
  saveTodos()
  todoInput.value = ""
})

function renderNewTodo(todo: Todo) {
  const listItem = document.createElement("li")
  listItem.classList.add("list-item")

  const label = document.createElement("label")
  label.classList.add("list-item-label")

  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.checked = todo.complete
  checkbox.classList.add("label-input")
  checkbox.addEventListener("change", () => {
    todo.complete = checkbox.checked
    saveTodos()
  })

  const textElement = document.createElement("span")
  textElement.classList.add("label-text")
  textElement.innerText = todo.name

  const deleteButton = document.createElement("button")
  deleteButton.classList.add("delete-btn")
  deleteButton.innerText = "Delete"
  deleteButton.addEventListener("click", () => {
    listItem.remove()
    todos = todos.filter(t => t.id !== todo.id)
    saveTodos()
  })

  label.append(checkbox, textElement)
  listItem.append(label, deleteButton)
  todoList.append(listItem)
}

function saveTodos() {
  localStorage.setItem("TODOS", JSON.stringify(todos))
}

function getTodos() {
  const value = localStorage.getItem("TODOS")
  if (value == null) {
    return []
  }
  return JSON.parse(value) as Todo[]
}
