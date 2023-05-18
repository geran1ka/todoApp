import { btnSaveActive, completeControl, deleteControl, editControl, formControl } from "./control.js";
import { getStorage } from "./localStorage.js";
import { renderTask, renderTodoTask } from "./renderElement.js";

const loadAppTodo = (app, user) => {
  const {
    title,
    list,
    listTitle,
    form,
    btnSave,
    btnReset,
  } = renderTodoTask(app, user);

  const task = getStorage(user);
  renderTask(list, task);
  btnSaveActive(form, btnSave, btnReset);
  formControl(form, user, list, btnSave);
  deleteControl(user, list, task);
  completeControl(list, user);
  editControl(list, user);
};

export const loadModal = (overlay, modal, app) => {
  modal.addEventListener('submit', e => {
    e.preventDefault();
    modal.classList.remove('modal_active');
    overlay.classList.remove('overlay_active');
    const user = Object.fromEntries(new FormData(e.target));
    const userName = user.user.trim().toUpperCase();
    console.log('userName: ', userName);
    loadAppTodo(app, userName);
  });
};