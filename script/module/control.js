import {addContactPage} from './createElement.js';
import {getStorage, removeStorage, addNewData as addNewTask} from './localStorage.js';
import {renderTask} from './renderElement.js';

export const formControl = (form, user, list) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTask = Object.fromEntries(formData);
    const number = getStorage(user).length;
    console.log('number: ', number);
    newTask.status = 'В процессе';
    newTask.number = number;
    addNewTask(user, newTask);
    addContactPage(list, newTask, number);
    form.reset();
  });
};

export const deleteControl = (user, list) => {
  list.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.btn-danger')) {
      const tr = target.closest('.table-light, .table-success');
      const number = +tr.id;
      removeStorage(user, number);
      tr.remove();
      renderTask(list, getStorage(user));
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
