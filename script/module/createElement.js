// функция создания контейнера
const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  return container;
};
// создание модального окна

export const createModal = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'overlay_active');

  const modal = document.createElement('div');
  modal.classList.add('modal', 'modal_active');
  modal.insertAdjacentHTML('beforeend', `
    <div class="modal__dialog modal-dialog">
    <div class="modal__content modal-content">
      <div class="modal__header modal-header">
        <h3 class="modal__title modal-title mb-4">Добро пожаловать в приложение ToDoApp!</h3>
    </div>
      <div class="modal__body modal-body">
        <form class="modal__form">
          <input type="text" name="user" class="modal__input form-control mb-4" required placeholder="Введите Ваше имя">
          <button class="btn btn-primary ">Запустить приложение</button>
        </form>
      </div>
    </div>
  </div>
  `);

  overlay.append(modal);
  return {
    overlay,
    modal,
  };
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
      <th class="th__task" data-sort="th__task">Задача</th>
      <th class="th__status" data-sort="th__status">Статус</th>
      <th class="th__priority" data-sort="th__priority">Приоритет</th>
      <th colspan="3" class="text-center">Действия</th>
    </tr>
  `);

  const tbody = document.createElement('tbody');
  tbody.classList.add('form__tbody');

  table.append(thead, tbody);
  // добавление свойства tbody в эелемент table
  table.tbody = tbody;
  table.thead = thead;
  return table;
};


const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('form', 'd-flex', 'align-items-center', 'mb-3');
  form.insertAdjacentHTML('beforeend', `
    <label class="form-group me-3 mb-0">
      <input type="text" class="form-control" name="task" placeholder="ввести задачу" required>
    </label>
    <select class="form__select me-3" name="priority">
      <option class="table-light" value="table-light" selected>обычная</option>
      <option class="table-warning" value="table-warning">важная</option>
      <option class="table-danger" value="table-danger">срочная</option>
    </select>
    `);

  const buttonGroup = createButtonGroup([
    {
      className: 'form__btn-primary btn btn-primary me-3',
      type: 'submit',
      text: 'Сохранить',
      disabled: 'disabled',
    },
    {
      className: 'form__btn-danger btn btn-danger',
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

const createRow = ({task, priority, status}, index) => {
  const tr = document.createElement('tr');
  tr.classList.add((`${status === 'Выполнено' ? 'table-success' : 'table-light'}`));
  tr.id = index;

  const tdNumber = document.createElement('td');
  tdNumber.classList.add('number');
  // tdNumber.textContent = index + 1;

  const tdTask = document.createElement('td');
  tdTask.classList.add(`${status === 'Выполнено' ? 'text-decoration-line-through' : 'task'}`);
  tdTask.textContent = task;

  const tdStatus = document.createElement('td');
  tdStatus.classList.add('status');
  tdStatus.textContent = status;

  const tdPriority = document.createElement('td');
  tdPriority.classList.add('priority');
  tdPriority.textContent =
    `${priority === 'table-danger' ? 'срочная' : priority === 'table-warning' ? 'важная' : 'обычная'}`;

  const tdBtnDel = document.createElement('td');
  const btnDel = document.createElement('button');
  btnDel.type = 'button';
  btnDel.classList.add('btn', 'btn-danger');
  btnDel.textContent = 'Удалить';
  tdBtnDel.append(btnDel);

  const tdBtnComplete = document.createElement('td');
  const btnComplete = document.createElement('button');
  btnComplete.type = 'button';
  btnComplete.classList.add('btn', 'btn-success');
  btnComplete.textContent = `${status === 'Выполнено' ? 'Отменить' : 'Завершить'}`;
  tdBtnComplete.append(btnComplete);

  const tdBtnEdit = document.createElement('td');
  const btnEdit = document.createElement('button');
  btnEdit.type = 'button';
  btnEdit.classList.add('btn', 'btn-primary');
  btnEdit.textContent = 'Редактировать';
  tdBtnEdit.append(btnEdit);

  tr.append(tdNumber, tdTask, tdStatus, tdPriority, tdBtnDel, tdBtnComplete, tdBtnEdit);
  return tr;
};

const createFooter = (user) => {
  const footer = document.createElement('footer');
  footer.classList.add('footer');

  const footerContainer = createContainer();
  footer.append(footerContainer);
  footer.footerContainer = footerContainer;

  const btnExit = document.createElement('button');
  btnExit.classList.add('btn', 'btn-danger');
  btnExit.textContent = `Выйти из приложения todoApp ${user}!`;
  footerContainer.append(btnExit);

  return {
    footer,
    btnExit,
  };
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
  createFooter,
  addContactPage,
};
