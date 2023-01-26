import './style.css';

// modules
import handleTodo from './modules/handleTodo.js';
import setLocalStorage from './modules/setLocalStorage.js';

// getting elements
const form = document.getElementById('addTodos-form');
const inputItem = document.querySelector('.input');
const todoContainer = document.querySelector('.todo-container');

// creating an empty array
let todoItems = [];

// displaying todos
const getList = (todoItems) => {
  todoContainer.innerHTML = '';
  if (todoItems.length > 0) {
    todoItems.forEach((todo) => {
      todoContainer.insertAdjacentHTML('beforeend', `
      <li class="todo">
    <div class="left" data-time="${todo.ID}">
      <input class='checkbox' type="checkbox" ${todo.Completed ? 'checked' : 'unchecked'}/>
      <label class="label" contenteditable="true">${todo.Description}</label>
    </div>
    <div class="right">
      <span class="fa-solid fa-trash fa-lg elippse-icon remove-btn">
      </span>
    </div>
  </li>      
      `);
      handleTodo(todo, todoItems);
    });
  } else {
    todoContainer.textContent = 'No tasks found, have fun!';
  }
};

// get items from local storage
const getLocalStorage = () => {
  const todoStorage = localStorage.getItem('Todos');
  if (todoStorage === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(todoStorage);
  }
  getList(todoItems);
};

// event
document.addEventListener('DOMContentLoaded', () => {
  // add todos to LS
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemName = inputItem.value.trim();
    const itemObj = {
      ID: todoItems.length + 1,
      Description: itemName,
      Completed: false,
    };
    todoItems.push(itemObj);
    setLocalStorage(todoItems);
    // display todos in realtime
    getList(todoItems);
    form.reset();
  });

  // retrive todos from LS
  getLocalStorage();
});

// clear all completed
document.querySelector('.clear-all').addEventListener('click', (e) => {
  e.preventDefault();
  const filteredTodos = todoItems.filter((item) => !item.Completed);
  for (let i = 0; i < filteredTodos.length; i += 1) {
    filteredTodos[i].ID = filteredTodos.indexOf(filteredTodos[i]) + 1;
  }
  todoItems = filteredTodos;
  setLocalStorage(todoItems);
  getList(todoItems);
});