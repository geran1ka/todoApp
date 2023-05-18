import {constTarget} from '../function/constTarget.js';
import {addContactPage} from './createElement.js';
import {getStorage, removeStorage, addNewData as addNewTask, setStorage} from './localStorage.js';
import {init} from '../script.js';
export const loadApp = (overlay, modal) => {
  modal.addEventListener('submit', e => {
    e.preventDefault();
    modal.classList.remove('modal_active');
    overlay.classList.remove('overlay_active');
    const user = Object.fromEntries(new FormData(e.target));
    init(user.user);
  });
}

export const btnSaveActive = (form, btnSave, btnReset) => {
  const input = form.task;
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
    // const index = getStorage(user).length;
    const idTask = +Math.random().toString().substring(2, 10);

    newTask.status = 'В процессе';
    newTask.id = idTask;

    addNewTask(user, newTask);
    addContactPage(list, newTask, idTask);
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
      const {tr, taskComplete, statusComplete, buttonComplete, id} = constTarget(target);
      const task = getStorage(user);

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
      task.map(item => (item.id === id ? item.status = statusComplete.textContent : ''));
      setStorage(user, task);
    }
  });
};

export const editControl = (list, user) => {
  list.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.btn-primary')) {
      const {tr, taskComplete, statusComplete, buttonComplete, id} = constTarget(target);
      const task = getStorage(user);
      const buttonEdit = tr.querySelector('.btn-primary');

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
      task.map(item => {
        if (item.id === id) {
          item.status = statusComplete.textContent;
          item.task = taskComplete.textContent;
        }
      });
      setStorage(user, task);
    }
  });
};

