import { createElement as create } from '../utils'
import TodoItem from './TodoItem'

import './App.css'

export default class App {
  constructor() {
    this.state = {
      todos: [
        {id: 1, title: 'Go to the store', checked: true},
        {id: 2, title: 'Learn JavaScript', checked: false},
        {id: 3, title: 'Learn React', checked: false},
      ], 
      todoInput: ''
    }

    this.todoIdCounter = 4

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  render() {
    return (
      create('div', {}, [
        create('header', {}, [
          create('h1', {}, ['TODO']),
        ]),
        create('form', {onsubmit: this.handleSubmit}, [
          create('div', {className: 'wrapper'}, [
            create('input', {type: 'text', value: this.state.todoInput, placeholder: 'Write todo title', oninput: this.handleInput}, []),
            create('button', {type: 'submit'}, ['Add Todo']),
          ])
        ]),
        create('ul', {}, [
          create('div', {className: 'wrapper'}, [
            ...this.state.todos.map(todo => new TodoItem(todo, this.handleDelete, this.handleToggle).render())
          ]),
        ]),
      ])
    )
  }

  handleSubmit(event) {
    event.preventDefault()
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