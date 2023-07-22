import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';

const saveFormState = () => {
  const state = { email: email.value, message: message.value };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
};

const loadFormState = () => {
  try {
    const serializedState = localStorage.getItem(LOCALSTORAGE_KEY);
    if (serializedState) {
      const { email: savedEmail, message: savedMessage } = JSON.parse(serializedState);
      email.value = savedEmail || '';
      message.value = savedMessage || '';
    }
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  const emailValue = email.value;
  const messageValue = message.value;

  if (emailValue && messageValue) {
    console.log({ email: emailValue, message: messageValue });
    resetFormState();
  } else {
    console.log('Пожалуйста, заполните оба поля: email и сообщение.');
  }
};

const resetFormState = () => {
  email.value = '';
  message.value = '';
  localStorage.removeItem(LOCALSTORAGE_KEY);
};

form.addEventListener('input', throttle(saveFormState, 500));
form.addEventListener('submit', handleSubmit);
loadFormState();








// import { throttle } from 'lodash';

// const form = document.querySelector('.feedback-form');
// const email = document.querySelector('input[name="email"]');
// const message = document.querySelector('textarea[name="message"]');
// const LOCALSTORAGE_KEY = 'feedback-form-state';

// const saveFormState = () => {
//   const objectToSave = { email: email.value, message: message.value };
//   localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave));
// };

// const loadFormState = (key) => {
//   try {
//     const serializedState = localStorage.getItem(key);
//     return serializedState ? JSON.parse(serializedState) : undefined;
//   } catch (error) {
//     console.error('Get state error: ', error.message);
//   }
// };

// const resetFormState = () => {
//   email.value = '';
//   message.value = '';
//   localStorage.removeItem(LOCALSTORAGE_KEY);
// };

// form.addEventListener(
//   'input',
//   throttle(saveFormState, 500)
// );

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   console.log({ email: email.value, message: message.value });
//   resetFormState();
// });

// const storageData = loadFormState(LOCALSTORAGE_KEY);
// if (storageData) {
//   email.value = storageData.email;
//   message.value = storageData.message;
// }