import {createTitle, createContainer, createTable, createForm, createRow} from './createElement.js';

export const renderTodoTask = (app, user) => {
  const title = createTitle(user);

  const tableWrapper = createContainer();
  tableWrapper.classList.add('table-wrapper');

  const table = createTable();
  tableWrapper.append(table);
  const form = createForm();
  app.append(title, form, tableWrapper);


  return {
    title,
    listTitle: table.thead,
    list: table.tbody,
    form,
  };
};

export const renderTask = (elem, data) => {
  elem.textContent = '';
  const allRow = data.map((item, index) => createRow(item, index));
  elem.append(...allRow);
  return allRow;
};
