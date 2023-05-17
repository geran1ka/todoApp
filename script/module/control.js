import {addContactPage} from './createElement.js';
import {getStorage, removeStorage, addNewData as addNewTask, setStorage} from './localStorage.js';
import {renderTask} from './renderElement.js';

export const formControl = (form, user, list) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTask = Object.fromEntries(formData);
    console.log('newTask: ', newTask);

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

export const completeControl = (list, user) => {
  list.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.btn-success')) {
      const tr = target.closest('.table-light, .table-success');
      const taskComplete = tr.querySelector('.task, .text-decoration-line-through');
      const statusComplete = tr.querySelector('.status');
      const buttonComplete = tr.querySelector('.btn-success');
      const task = getStorage(user);
      const id = tr.id;
      console.log('id: ', id);
      console.log('task compete: ', task);

      if (target.closest('.table-light')) {
        tr.className = 'table-success';
        taskComplete.className = 'text-decoration-line-through';
        statusComplete.textContent = 'Выполнено';
        buttonComplete.textContent = 'Отменить';
      } else {
        tr.className = 'table-light';
        taskComplete.className = 'task';
        statusComplete.textContent = 'В процессе';
        buttonComplete.textContent = 'Завершить';
      }
      task[id].status = statusComplete.textContent;
      setStorage(user, task);
    }
  });
};
