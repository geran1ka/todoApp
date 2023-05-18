import {addContactPage} from './createElement.js';
import {getStorage, removeStorage, addNewData as addNewTask, setStorage} from './localStorage.js';
import {renderTask} from './renderElement.js';

export const btnSaveActive = (form, btnSave, btnReset) => {
  const input = form.task;
  console.log('input: ', input);
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
    console.log('formData: ', formData);
    const newTask = Object.fromEntries(formData);
    console.log('newTask: ', newTask);
    const index = getStorage(user).length;

    newTask.status = 'В процессе';
    newTask.id = Math.random().toString().substring(2, 10);

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
      if (confirm(`${user}, Вы действительно хотите удалить задачу`)) {
        const number = +tr.id;
        removeStorage(user, number);
        tr.remove();
        //renderTask(list, getStorage(user));
      } else {
        target.closest('.btn-danger').blur();
      }
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

export const editControl = (list, user) => {
  list.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.btn-primary')) {
      const tr = target.closest('.table-light, .table-success');
      const taskComplete = tr.querySelector('.task, .text-decoration-line-through');
      const statusComplete = tr.querySelector('.status');
      const buttonComplete = tr.querySelector('.btn-success');
      const buttonEdit = tr.querySelector('.btn-primary');
      const task = getStorage(user);
      const id = tr.id;
      if (target.closest('.btn-primary').textContent === 'Редактировать') {
        taskComplete.setAttribute('contenteditable', true);
        taskComplete.focus();
        tr.className = 'table-light';
        taskComplete.className = 'task';
        statusComplete.textContent = 'В процессе';
        buttonComplete.textContent = 'Завершить';
        buttonEdit.textContent = 'Сохранить';
      } else {
        taskComplete.setAttribute('contenteditable', false);
        buttonEdit.textContent = 'Редактировать';
        console.log(taskComplete.textContent);
      }
      task[id].status = statusComplete.textContent;
      task[id].task = taskComplete.textContent;
      setStorage(user, task);
    }
  });
};

