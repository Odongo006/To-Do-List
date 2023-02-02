import ToDoListHelper from './toDoListSupport.js';

class ToDoList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('datastore')) || [];
  }

  getTasks = () => this.tasks;

  showList = () => {
    const listContainer = document.querySelector('.to-do-list');
    listContainer.innerHTML = '';
    this.getTasks().forEach((todo) => {
      listContainer.innerHTML += `<li class='todo-item'>
        <input type='checkbox' class="checkbox" id=${todo.index} ${todo.completed ? 'checked' : ''}/>
        <input type='text' class='item-description ${todo.completed ? 'strike-line' : ''}' data-pos='${todo.index}' 
        value='${todo.description}' disabled/>
        <span class='modify fa fa-ellipsis-v fa_custom'></span>
        <span class='trash-btn d-none fa fa-trash delete-button' data-index=${todo.index}></span>
      </li>`;
    });

    if (this.getTasks().length > 0) {
      ToDoListHelper.checkBoxEventHandler(this);
      ToDoListHelper.deleteButtonEventHandler(this);
      ToDoListHelper.editElipsisEventHandler(this);
      ToDoListHelper.editTextEventHandler();
    }
  }

  saveToStorage = () => {
    localStorage.setItem('datastore', JSON.stringify(this.getTasks()));
  }

  saveTaskInList = (description, completed = false) => {
    this.tasks.push({ description, completed, index: this.getTasks().length + 1 });
    this.saveToStorage();
    this.showList();
  }

  deleteTaskFromList = (clear = false, itemIndex = -1) => {
    if (clear) {
      this.tasks = this.getTasks().filter((task) => task.completed === false);
    }
    if (itemIndex > 0) this.tasks.splice(itemIndex - 1, 1);

    this.regenerateTaskIds();
    this.saveToStorage();
    this.showList();
  }

  updateTaskStatus = (updateIndex) => {
    if (this.tasks[updateIndex].completed) {
      this.tasks[updateIndex].completed = false;
    } else {
      this.tasks[updateIndex].completed = true;
    }
    this.saveToStorage();
  }

  regenerateTaskIds = () => {
    this.tasks = this.getTasks().map((task, index) => {
      task.index = index + 1;
      return task;
    });
  }

  editDescription = ({ id, data }) => {
    this.tasks = this.getTasks().map((task) => {
      if (task.index === id && data !== '') task.description = data;
      return task;
    });
    this.saveToStorage();
    this.showList();
  }
}

export default ToDoList;