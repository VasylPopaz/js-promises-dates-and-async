import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
require('flatpickr/dist/themes/dark.css');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const startButton = document.querySelector('[data-start]');
const dateTimeInput = document.querySelector('#datetime-picker');
const dateOutput = document.querySelectorAll('.value');
let selectedDate = '';
let timerId = null;
startButton.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (new Date() > selectedDate)
      return Notify.failure('Please choose a date in the future');
    startButton.disabled = false;
  },
};

flatpickr(dateTimeInput, options);

startButton.addEventListener('click', () => {
  dateTimeInput.disabled = true;
  startButton.disabled = true;
  timerId = setInterval(() => {
    const dateObj = convertMs(selectedDate - new Date());
    Object.keys(dateObj).forEach((elem, index) => {
      dateOutput[index].textContent = addLeadingZero(dateObj[elem]);
      if (dateObj.seconds === 0) {
        dateTimeInput.disabled = false;
        clearInterval(timerId);
      }
    });
  }, 1000);
});
