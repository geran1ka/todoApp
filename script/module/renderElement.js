import {createTitle, createContainer, createTable, createForm, createRow, createModal, createFooter} from './createElement.js';

export const renderOverlay = (app) => {
  const {overlay, modal} = createModal();
  const body = document.querySelector('body');
  body.append(overlay);
  return {
    overlay,
    modal,
  };
};

export const renderTodoTask = (app, user) => {
  const title = createTitle(user);

  const tableWrapper = createContainer();
  tableWrapper.classList.add('table-wrapper');

  const table = createTable();
  tableWrapper.append(table);
  const {form, btnSave, btnReset} = createForm();
  const {footer, btnExit} = createFooter(user);
  app.append(title, form, tableWrapper, footer);

  return {
    title,
    listTitle: table.thead,
    list: table.tbody,
    form,
    btnSave,
    btnReset,
    footer,
    btnExit,
  };
};

export const renderTask = (elem, data) => {
  elem.textContent = '';
  const allRow = data.map((item) => createRow(item, item.id));
  elem.append(...allRow);
  return allRow;
};
