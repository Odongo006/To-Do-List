import ToDoList from '../modules/toDoList.js';

const toDoList = new ToDoList();
document.body.innerHTML = '<div><ul class="to-do-list"></ul></div>';

describe('To-do list edit list test', () => {
  test('edit tasks', () => {
    toDoList.saveTaskInList('Add item 1');
    let lists = document.querySelectorAll('.to-do-list li');
    expect(lists).toHaveLength(1);

    toDoList.editDescription({ id: 1, data: 'Edited item 1' });
    let desc = document.querySelectorAll('.item-description')[0].value;
    expect(desc).toBe('Edited item 1');

    toDoList.saveTaskInList('Add item 2');
    lists = document.querySelectorAll('.to-do-list li');
    expect(lists).toHaveLength(2);

    toDoList.editDescription({ id: 2, data: 'Edited item 2' });
    desc = document.querySelectorAll('.item-description')[1].value;
    expect(desc).toBe('Edited item 2');
  });
});

describe('To-do list update completed status test', () => {
  test('update completed tasks', () => {
    toDoList.updateTaskStatus(0);
    toDoList.showList();
    let { checked } = document.querySelectorAll('.checkbox')[0];
    expect(checked).toBe(true);

    toDoList.updateTaskStatus(1);
    toDoList.showList();
    checked = document.querySelectorAll('.checkbox')[1].checked;
    expect(checked).toBe(true);
  });
});

describe('To-do list clear completed tasks test', () => {
  test('clear completed tasks', () => {
    let checkedList = document.querySelectorAll('.to-do-list li');
    expect(checkedList).toHaveLength(2);

    toDoList.deleteTaskFromList(true);
    let listItems = document.querySelectorAll('.to-do-list li');
    expect(listItems).toHaveLength(0);

    toDoList.saveTaskInList('Add item 1');
    toDoList.saveTaskInList('Add item 2');
    toDoList.updateTaskStatus(0);
    toDoList.updateTaskStatus(1);
    checkedList = document.querySelectorAll('.to-do-list li');
    expect(checkedList).toHaveLength(2);

    toDoList.deleteTaskFromList(true);
    listItems = document.querySelectorAll('.to-do-list li');
    expect(listItems).toHaveLength(0);
  });
});
