import {addClassElem, changeClassElem} from '../function/changeClassElem.js';
import {getStorage} from './localStorage.js';
import {getCounter as counter} from '../function/counter.js';
import {renderTask} from './renderElement.js';

const clickTask = counter();
const clickStatus = counter();
const clickPriority = counter();

// Для подтягивания из localStorage значения click при обновлении страницы
const singleTriggerCondition = counter();

const sortData = (sort, user) => {
  let click = null;

  if ((+localStorage.getItem('click') === 1) && !singleTriggerCondition()) {
    click = +localStorage.getItem('click');
  } else {
    switch (sort) {
      case 'th__task':
        click = clickTask();
        clickStatus.reset();
        clickPriority.reset();
        break;
      case 'th__status':
        click = clickStatus();
        clickTask.reset();
        clickPriority.reset();
        break;
      case 'th__priority':
        click = clickPriority();
        clickTask.reset();
        clickStatus.reset();
        break;
    }
  }
  changeClassElem('.up', 'up', 'remove');
  changeClassElem('.down', 'down', 'remove');

  const data = getStorage(user);

  if (click % 2 === 0) {
    data.sort((a, b) => (a[sort] > b[sort] ? 1 : -1));
    changeClassElem(`.${sort}`, 'up', 'add');
    localStorage.setItem('click', 0);
  } else {
    data.sort((a, b) => (a[sort] > b[sort] ? -1 : 1));
    changeClassElem(`.${sort}`, 'down', 'add');
    localStorage.setItem('click', 1);
  }
  singleTriggerCondition();
  return data;
};

const sortControl = (listTitle, list, user) => {
  listTitle.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('th') && !target.closest('.th-edit')) {
      const sortKey = target.dataset.sort;
      renderTask(list, sortData(sortKey, user));
      localStorage.setItem('sort', sortKey);
    }
  });
};

export {
  addClassElem,
  changeClassElem,
  sortData,
  sortControl,
};

