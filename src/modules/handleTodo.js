/* eslint-disable linebreak-style */
import setLocalStorage from './setLocalStorage.js';

const todoContainer = document.querySelector('.todo-container');

const handleTodo = (todo, todoItems) => {
  const items = document.querySelectorAll('.todo');
  items.forEach((item) => {
    const idInNum = Number(item.querySelector('.left').getAttribute('data-time'));
    if (idInNum === todo.ID) {
      // mark complete
      item.querySelector('.checkbox').addEventListener('change', () => {
        const itemIndex = todoItems.indexOf(todo);
        const currentItem = todoItems[itemIndex];
        currentItem.Completed = !currentItem.Completed;
        todoItems.splice(itemIndex, 1, currentItem);
        setLocalStorage(todoItems);
      });
      // update todo
      item.querySelector('.label').addEventListener('blur', () => {
        const itemIndex = todoItems.indexOf(todo);
        const currentItem = todoItems[itemIndex];
        currentItem.Description = item.textContent;
        todoItems.splice(itemIndex, 1, currentItem);
        setLocalStorage(todoItems);
      });
      // delete todo
      item.querySelector('.remove-btn').addEventListener('click', (e) => {
        e.preventDefault();
        todoContainer.removeChild(item);
        const removeIndex = todoItems.indexOf(todo);
        todoItems.splice(removeIndex, 1);
        for (let i = 0; i < todoItems.length; i += 1) {
          todoItems[i].ID = todoItems.indexOf(todoItems[i]) + 1;
        }
        setLocalStorage(todoItems);
      });
    }
  });
};

export default handleTodo;