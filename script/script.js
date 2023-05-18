import {renderOverlay} from './module/renderElement.js';
import {loadModal} from './module/load.js';


export const init = (user) => {
  const app = document.querySelector('.app-container');
  app.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-column');
  const {overlay, modal} = renderOverlay();
  loadModal(overlay, modal, app);
};

init();
