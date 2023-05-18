import {createTitle, createContainer, createTable, createForm, createRow, createModal} from './createElement.js';

export const renderOverlay = (app) => {
  const {overlay, modal} = createModal();
  app.append(overlay);
  //overlay.show();
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
  app.append(title, form, tableWrapper);


  return {
    title,
    listTitle: table.thead,
    list: table.tbody,
    form,
    btnSave,
    btnReset,
  };
};

export const renderTask = (elem, data) => {
  elem.textContent = '';
  const allRow = data.map((item) => createRow(item, item.id));
  elem.append(...allRow);
  return allRow;
};
