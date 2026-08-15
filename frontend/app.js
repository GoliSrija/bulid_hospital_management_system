// Initialize variables
let form = document.getElementById('hospitalForm');
let tableBody = document.getElementById('table-body');

// Function to validate form
function validateForm() {
  const formData = new FormData(form);
  let valid = true;

  formData.forEach((value, key) => {
    if (key === 'email' && !value.includes('@')) {
      form.setLastError(key, 'Invalid email format');
      valid = false;
    } else if (key === 'number' && !/^(\d+)$/i.test(value)) {
      form.setLastError(key, 'Invalid number format');
      valid = false;
    }
  });

  return valid;
}

// Function to handle form submission
function handleFormSubmit(e) {
  e.preventDefault();
  if (validateForm()) {
    const newRow = tableBody.insertRow(-1);
    const newRowInputs = Array.from(form.elements).map((input) => {
      const cell = newRow.insertCell();
      cell.innerHTML = `<span>${input.value}</span>`;
      input.oninput = function() {
        cell.innerHTML = `<span>${input.value}</span>`;
      };
    });

    tableBody.addEventListener('click', function(event) {
      if (event.target.tagName.toLowerCase() === 'span') {
        const selectedCell = event.target;
        const row = selectedCell.parentElement;
        const inputs = row.cells.filter(cell => cell.tagName === 'TD').map(cell => cell.querySelector('span'));

        form.reset();
        inputs.forEach(input => input.value = input.textContent.replace('<span>', '').replace('</span>', ''));
        inputs.forEach((input, index) => input.addEventListener('input', () => {
          const newRow = tableBody.insertRow(-1);
          newRowInputs[index].innerHTML = `<span>${input.value}</span>`;
        }));
      }
    });

    form.reset();
  }
}

// Function to set form errors
function setLastError(inputId, message) {
  const input = document.getElementById(inputId);
  input.classList.add('error');
  const errorLabel = document.createElement('label');
  errorLabel.className = 'error';
  errorLabel.textContent = message;
  input.parentElement.insertBefore(errorLabel, input.nextSibling);
}

// Function to clear form errors
function clearFormErrors() {
  const inputElements = document.querySelectorAll('input.error');
  inputElements.forEach(input => {
    input.classList.remove('error');
    input.parentElement.removeChild(input.parentElement.querySelector('.error'));
  });
}

// Add event listeners
form.addEventListener('submit', handleFormSubmit);
form.addEventListener('input', validateForm);
form.addEventListener('reset', clearFormErrors);