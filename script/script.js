import {renderTodoTask, renderTask, renderOverlay} from './module/renderElement.js';
import {btnSaveActive, completeControl, deleteControl, editControl, formControl} from './module/control.js';
import {getStorage} from './module/localStorage.js';
import { createModal } from './module/createElement.js';

const user = 'Роман';
const init = () => {
  const app = document.querySelector('.app-container');
  app.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-column');

  renderOverlay(app);

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

init();
