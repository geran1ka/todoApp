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
  form.insertAdjacentHTML('beforeend', `
    <label class="form-group me-3 mb-0">
      <input type="text" class="form-control" name="task" placeholder="ввести задачу" required>
    </label>
    `);

  const buttonGroup = createButtonGroup([
    {
      className: 'btn btn-primary me-3',
      type: 'submit',
      text: 'Сохранить',
      disabled: 'disabled',
    },
    {
      className: 'btn btn-danger',
      type: 'reset',
      text: 'Очистить',
    },
  ]);

  form.append(...buttonGroup.btns);

  return {
    form,
    btnSave: buttonGroup.btns[0],
    btnReset: buttonGroup.btns[1],
  };
};

const createRow = ({task, status}, index) => {
  const tr = document.createElement('tr');
  tr.classList.add((`${status === 'Выполнено' ? 'table-success' : 'table-light'}`));
  tr.id = index;

  const tdNumber = document.createElement('td');
  tdNumber.classList.add('number');
  tdNumber.textContent = index + 1;

  const tdTask = document.createElement('td');
  tdTask.classList.add(`${status === 'Выполнено' ? 'text-decoration-line-through' : 'task'}`);
  tdTask.textContent = task;

  const tdStatus = document.createElement('td');
  tdStatus.classList.add('status');
  tdStatus.textContent = status;

  const tdActions = document.createElement('td');
  const btnDel = document.createElement('button');
  btnDel.type = 'button';
  btnDel.classList.add('btn', 'btn-danger', 'me-1');
  btnDel.textContent = 'Удалить';

  const btnComplete = document.createElement('button');
  btnComplete.type = 'button';
  btnComplete.classList.add('btn', 'btn-success');
  btnComplete.textContent = `${status === 'Выполнено' ? 'Отменить' : 'Завершить'}`;
  tdActions.append(btnDel, btnComplete);

  tr.append(tdNumber, tdTask, tdStatus, tdActions);
  return tr;
};

const addContactPage = (list, task, index) => {
  list.append(createRow(task, index));
};

export {
  createContainer,
  createTitle,
  createTable,
  createForm,
  createRow,
  addContactPage,
};
