import {addContactPage} from './createElement.js';
import {getStorage, removeStorage, addNewData as addNewTask, setStorage} from './localStorage.js';
import {renderTask} from './renderElement.js';

export const btnSaveActive = (form, btnSave, btnReset ) => {
  const input = form.querySelector('.form-control');
  if (!input.value) btnSave.setAttribute('disabled', 'disabled');

  input.addEventListener('input', () => {
    input.value ? btnSave.removeAttribute('disabled') : btnSave.setAttribute('disabled', 'disabled');
  });

  btnReset.addEventListener('click', () => {
    btnSave.setAttribute('disabled', 'disabled');
  });
};

export const formControl = (form, user, list, btnSave) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTask = Object.fromEntries(formData);
    const index = getStorage(user).length;

    newTask.status = 'В процессе';
    //newTask.id = Math.random().toString().substring(2, 10);

    addNewTask(user, newTask);
    addContactPage(list, newTask, index);
    btnSave.setAttribute('disabled', 'disabled');
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
