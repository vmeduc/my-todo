import { createElement as create } from '../utils'

export default class TodoItem {
  constructor({id, title, checked}, onDelete, onToggle) {
    this.id = id
    this.emitDelete = onDelete
    this.emitToggle = onToggle
    
    this.state = {
      title,
      checked,
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  render() {
    return create('li', {id: this.id}, [
      create('input', {type: 'checkbox', onclick: this.handleToggle, checked: this.state.checked}, []),
      create('label', {}, [this.state.title]),
      create('button', {onclick: this.handleDelete}, ['delete'])
    ])
  }

  handleDelete() {
    this.emitDelete(this.id)
  }

  handleToggle() {
    this.checked = !this.checked
    this.emitToggle(this.id)
  }


  mount(id=this.id) {
    const element = document.getElementById(id)
    element.innerHTML = ''
    element.append(this.render())
    return this
  }
}