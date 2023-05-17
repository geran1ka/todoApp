import {renderTodoTask, renderTask} from './module/renderElement.js';
import {completeControl, deleteControl, formControl} from './module/control.js';
import {getStorage} from './module/localStorage.js';


const user = 'Роман';

const init = () => {
  const app = document.querySelector('.app-container');
  app.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-column');

  const {
    title,
    list,
    listTitle,
    form,
  } = renderTodoTask(app, user);
  const task = getStorage(user);

  renderTask(list, task);
  formControl(form, user, list);
  deleteControl(user, list, task);
  completeControl(list, user);
};

init();
