export const constTarget = (target) => {
  const tr = target.closest('.table-light, .table-success');
  const taskComplete = tr.querySelector('.task, .text-decoration-line-through');
  const statusComplete = tr.querySelector('.status');
  const buttonComplete = tr.querySelector('.btn-success');
  const id = +tr.id;
  return {
    tr,
    taskComplete,
    statusComplete,
    buttonComplete,
    id,
  };
};

