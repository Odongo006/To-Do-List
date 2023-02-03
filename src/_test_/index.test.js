import ToDoList from '../modules/toDoList.js';

const toDoList = new ToDoList();
describe('To-do list add list test', () => {
  document.body.innerHTML = '<div><ul class="to-do-list"></ul></div>';

  test('add item 1', () => {
    toDoList.saveTaskInList('Add item 1');
    const lists = document.querySelectorAll('.to-do-list li');
    expect(lists).toHaveLength(1);
  });

  test('add item 2', () => {
    toDoList.saveTaskInList('Add item 2');
    const lists = document.querySelectorAll('.to-do-list li');
    expect(lists).toHaveLength(2);
  });

  test('add item 3', () => {
    toDoList.saveTaskInList('Add item 3');
    const lists = document.querySelectorAll('.to-do-list li');
    expect(lists).toHaveLength(3);
  });

  test('add item 4', () => {
    toDoList.saveTaskInList('Add item 4');
    const lists = document.querySelectorAll('.to-do-list li');
    expect(lists).toHaveLength(4);
  });

  test('add item 5', () => {
    toDoList.saveTaskInList('Add item 5');
    const lists = document.querySelectorAll('.to-do-list li');
    expect(lists).toHaveLength(5);
  });
});

describe('To-do list delete list test', () => {
  test('delete item 2', () => {
    toDoList.deleteTaskFromList(false, 2);
    const lists = document.querySelectorAll('.to-do-list li');
    expect(lists).toHaveLength(4);
  });

  test('delete item 1', () => {
    toDoList.deleteTaskFromList(false, 1);
    const lists = document.querySelectorAll('.to-do-list li');
    expect(lists).toHaveLength(3);
  });

  test('delete item 3', () => {
    toDoList.deleteTaskFromList(false, 3);
    const lists = document.querySelectorAll('.to-do-list li');
    expect(lists).toHaveLength(2);
  });

  test('delete out of bound index item', () => {
    toDoList.deleteTaskFromList(false, 3);
    const lists = document.querySelectorAll('.to-do-list li');
    expect(lists).toHaveLength(2);
  });
});
