const getStorage = (key) => (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []);

const setStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const addNewData = (key, value) => {
  const data = getStorage(key);
  data.push(value);
  setStorage(key, data);
};

const removeStorage = (key, value) => {
  const data = getStorage(key);
  console.log(data);
  const newData = data.filter(item => item.number !== value);
  setStorage(key, newData);
};

export {
  getStorage,
  setStorage,
  addNewData,
  removeStorage,
};
