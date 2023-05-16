import {addContactPage} from './createElement.js';
import {getStorage, setStorage, removeStorage, addNewData as addNewTask} from './localStorage.js';

export const formControl = (form, user, list) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTask = Object.fromEntries(formData);
    const number = getStorage(user).length + 1;
    console.log('number: ', number);
    newTask.status = 'В процессе';
    newTask.number = number;
    addNewTask(user, newTask);
    addContactPage(list, newTask);
    form.reset();
  });
};

export const deleteControl = (user, list, task) => {
  list.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.btn-danger')) {
      const tr = document.querySelector('.table-light, .table-success');
      const number = +document.querySelector('.number').textContent;
      removeStorage(user, number);
      tr.remove();
    }
  });
};

export const completeControl = (list) => {
  list.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.btn-success')) {
      const tr = document.querySelector('.table-light');
      tr.className = 'table-success';
      const taskComplete = tr.querySelector('.task');
      taskComplete.className = 'text-decoration-line-through';
      const statusComplete = tr.querySelector('.status');
      statusComplete.textContent = 'Выполнено';
    }
  });
};
