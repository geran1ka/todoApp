import {btnSaveActive, completeControl, deleteControl, editControl, exitControl, formControl} from './control.js';
import {getStorage, setStorage} from './localStorage.js';
import {renderTask, renderTodoTask} from './renderElement.js';
import * as sort from './sort.js';


const loadAppTodo = (app, user, firstStartApp) => {
  firstStartApp.firstStartApp = 1;
  firstStartApp.user = user;
  setStorage('firstStartApp', firstStartApp);
  const {
    title,
    list,
    listTitle,
    form,
    btnSave,
    btnReset,
    footer,
    btnExit,
  } = renderTodoTask(app, user);

  const task = getStorage(user);

  if (localStorage.getItem('sort')) {
    renderTask(list, sort.sortData(localStorage.getItem('sort'), user));
  } else {
    renderTask(list, task);
  }
  sort.sortControl(listTitle, list, user);
  btnSaveActive(form, btnSave, btnReset);
  formControl(form, user, list, btnSave);
  deleteControl(user, list, task);
  completeControl(list, user);
  editControl(list, user);
  exitControl(btnExit, firstStartApp);
};

export const loadModal = (overlay, modal, app) => {
  const firstStartApp = localStorage.getItem('firstStartApp') ?
    JSON.parse(localStorage.getItem('firstStartApp')) : {};
  if (!firstStartApp.firstStartApp) {
    modal.addEventListener('submit', e => {
      e.preventDefault();
      modal.classList.remove('modal_active');
      overlay.classList.remove('overlay_active');
      const user = Object.fromEntries(new FormData(e.target));
      const userName = user.user.trim().toUpperCase();
      loadAppTodo(app, userName, firstStartApp);
    });
  } else {
    modal.classList.remove('modal_active');
    overlay.classList.remove('overlay_active');
    const userName = firstStartApp.user.trim().toUpperCase();
    loadAppTodo(app, userName, firstStartApp);
  }
};
