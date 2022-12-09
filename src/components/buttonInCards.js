/**
* Creates a edit button of job card
* @param {HTMLElement} parent
*  @param {String} key
* */
export function addJobCardEditButton(parent, key) {
  const editButton = document.createElement('button');

  editButton.setAttribute('class', 'btn btn-outline-secondary btn-sm');
  editButton.setAttribute('style', 'margin-right: 0.4em;');
  editButton.setAttribute('type', 'submit');
  editButton.innerHTML = 'Edit';
  editButton.setAttribute('id', 'edit-app');
  editButton.setAttribute('data-bs-toggle', 'modal');
  editButton.setAttribute('data-bs-target', '#updateApp');
  editButton.setAttribute('data-id', key);
  parent.appendChild(editButton);
}

/**
* Creates a delete button of job card
* @param {HTMLElement} parent
* @param {int} key
* */
export function addJobCardDeleteButton(parent, key) {
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn',
      'btn-outline-secondary',
      'btn-sm');
  deleteButton.setAttribute('type', 'submit');
  deleteButton.setAttribute('id', 'delete-app');
  deleteButton.innerHTML = 'Delete';
  deleteButton.setAttribute('data-bs-toggle', 'modal');
  deleteButton.setAttribute('data-bs-target', '#deleteApp');
  deleteButton.setAttribute('data-id', key);
  parent.appendChild(deleteButton);
}
