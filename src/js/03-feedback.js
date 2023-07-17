import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';

const saveFormState = () => {
  const objectToSave = { email: email.value, message: message.value };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave));
};

const loadFormState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const resetFormState = () => {
  email.value = '';
  message.value = '';
  localStorage.removeItem(LOCALSTORAGE_KEY);
};

form.addEventListener(
  'input',
  throttle(saveFormState, 500)
);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log({ email: email.value, message: message.value });
  resetFormState();
});

const storageData = loadFormState(LOCALSTORAGE_KEY);
if (storageData) {
  email.value = storageData.email;
  message.value = storageData.message;
}