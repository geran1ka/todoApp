const data = [
  {
    number: 1,
    task: 'Купить слона',
    status: 'В процессе',
  },
  {
    number: 2,
    task: 'Купить машину',
    status: 'Завершена',
  },
]
// функция создания контейнера
const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  return container;
};
// функция создания заголовка
const createTitle = user => {
  const h3 = document.createElement('h3');
  h3.textContent = `Todo APP. ${user}!`;
  return h3;
};

// функция создания группы кнопок
const createButtonGroup = params => {
  const btnWrapper = document.createElement('div'); // создание обертки для кнопок
  btnWrapper.classList.add('btn-wrapper'); // добавление класса обертке для кнопок

  const btns = params.map(({className, type, text}) => {
    // создание кнопки
    const button = document.createElement('button');
    button.type = type; // добавление типа кнопки
    button.textContent = text; // добавление названия кнопки
    button.className = className; // добавление класса кнопки

    return button;
  });
  // вставка созданных кнопок в обертку для кнопок
  btnWrapper.append(...btns);

  return {
    btnWrapper,
    btns,
  };
};


const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');

  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
    </tr>
  `);

  const tbody = document.createElement('tbody');

  table.append(thead, tbody);
  // добавление свойства tbody в эелемент table
  table.tbody = tbody;
  table.thead = thead;
  return table;
};


const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');
  const label = document.createElement('label');
  label.classList.add('form-group', 'me-3', 'mb-0',)
  const input = document.createElement('input');
  input.classList.add('form-control');
  input.type = 'text';
  input.placeholder = 'ввести задачу';
  label.append(input);

  form.append(label);
  /*
  form.insertAdjacentHTML('beforeend', `
    <label class="form-group me-3 mb-0">
      <input type="text" class="form-control" placeholder="ввести задачу">
    </label>

    <button type="submit" class="btn btn-primary me-3">
      Сохранить
    </button>

    <button type="reset" class="btn btn-warning">
      Очистить
    </button>
  `);
  */
return form;
};

const createRow = ({number, task, status}) => {
  const tr = document.createElement('tr');
  tr.classList.add('table-light');

  const tdNumber = document.createElement('td');
  tdNumber.textContent = number;

  const tdTask = document.createElement('td');
  tdTask.classList.add('task');
  tdTask.textContent = task;

  const tdStatus = document.createElement('td');
  tdStatus.textContent = status;

  const tdActions = document.createElement('td');
  const btnDel = document.createElement('button');
  btnDel.type = 'button';
  btnDel.classList.add('btn', 'btn-danger', 'me-1');
  btnDel.textContent = 'Удалить';

  const btnComplete = document.createElement('button');
  btnComplete.type = 'button';
  btnComplete.classList.add('btn', 'btn-success');
  btnComplete.textContent = 'Завершить';
  tdActions.append(btnDel, btnComplete);

  tr.append(tdNumber, tdTask, tdStatus, tdActions);
  return tr;
};

const addTaskPage = (task, list) => {
  list.append(createRow(contact));
};


const renderTodoTask = (app, user) => {
  const title = createTitle(user);

  const tableWrapper = createContainer();
  tableWrapper.classList.add('table-wrapper');

  const table = createTable();
  console.log('table: ', table);
  tableWrapper.append(table);
  /*
  const buttonGroup = createButtonGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);
*/
  const form = createForm();
  app.append(title, form, tableWrapper);
  

  return {
    title,
    listTitle: table.thead,
    list: table.tbody,
    form,
  };
};

const renderContacts = (elem, data) => {
  elem.textContent = '';
  const allRow = data.map(item => createRow(item));
  elem.append(...allRow);
  return allRow;
};



 const init = () => {
  const app = document.querySelector('.app-container');
  app.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-column')
  
  const {
    title,
    list,
    listTitle,
    form,
  } = renderTodoTask(app, 'Роман');

  console.log(list);
  renderContacts(list, data)
  
 }

 init();
