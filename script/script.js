import {renderTodoTask, renderTask, renderOverlay} from './module/renderElement.js';
import {btnSaveActive, completeControl, deleteControl, editControl, formControl, loadApp} from './module/control.js';
import {getStorage} from './module/localStorage.js';
import {createModal} from './module/createElement.js';
import { loadModal } from './module/load.js';


export const init = (user) => {
  const app = document.querySelector('.app-container');
  app.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-column');

  const {overlay, modal} = renderOverlay();
  loadModal(overlay, modal, app);
};

init();
