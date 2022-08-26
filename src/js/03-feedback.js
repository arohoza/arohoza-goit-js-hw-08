import throttle from 'lodash.throttle';

import storageApi from './storage.js';
const STORAGE_FORM_KEY = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form');

initPage();

const handleInput = event => {
  //   console.log(event);
  let savedValue = storageApi.load(STORAGE_FORM_KEY);

  if (!savedValue) {
    savedValue = {};
  }
  const { name, value } = event.target;
  savedValue[name] = value;
  storageApi.save(STORAGE_FORM_KEY, savedValue);
};

formRef.addEventListener('input', throttle(handleInput, 500));

function initPage() {
  const savedValue = storageApi.load(STORAGE_FORM_KEY);

  if (!savedValue) {
    return;
  }
  Object.entries(savedValue).forEach(([name, value]) => {
    formRef.elements[name].value = value;
  });
}
const handleSubmit = event => {
  event.preventDefault();
  const { email, message } = event.target;
  if (email.value === '' || message.value === '') {
    alert('Please fill in all the fields!');
    return;
  }
  const userData = { email: email.value, message: message.value };
  console.log(userData);
  storageApi.remove(STORAGE_FORM_KEY);
  event.target.reset();
};

formRef.addEventListener('submit', handleSubmit);
