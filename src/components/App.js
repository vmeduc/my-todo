import { createElement as create } from '../utils'
import TodoItem from './TodoItem'

export default class App {
  constructor() {
    this.state = {
      todos: [
        {id: 1, title: 'first todo', checked: true},
        {id: 2, title: 'second todo', checked: false},
        {id: 3, title: 'third todo', checked: false},
      ], 
      todoInput: 'initialValue'
    }

    this.todoIdCounter = 4

    this.handleClick = this.handleClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  render() {
    return create('div', {}, [
      create('input', {type: 'text', value: this.state.todoInput, oninput: this.handleInput}, []),
      create('button', {onclick: this.handleClick}, ['addTodo']),
      create('ul', {}, this.state.todos.map((todo) => {
        return new TodoItem(todo, this.handleDelete, this.handleToggle).render()
      }))
    ])
  }

  handleClick() {
    const newTodo = {id: this.todoIdCounter++, title: this.state.todoInput}
    this.state.todos.push(newTodo)
    this.mount('app')
  }

  handleInput(event) {
    this.state.todoInput = event.target.value
  }

  handleDelete(id) {
    this.state.todos = this.state.todos.filter(todo => todo.id !== id)
    this.mount('app')
  }

  handleToggle(id) {
    const todoItem = this.state.todos.find(todo => todo.id === id)
    todoItem.checked = !todoItem.checked
  }

  
  mount(id) {
    const element = document.getElementById(id)
    element.innerHTML = ''
    element.append(this.render())
    return this
  }
}