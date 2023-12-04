import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    let timerId = setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
  promise
    .then(value => {
      Notify.success(value);
      return { position: position, delay: delay };
    })
    .catch(error => {
      Notify.failure(error);
      return { position: position, delay: delay };
    });

  // return new Promise((resolve, reject) => {
  //   let timerId = setTimeout(() => {
  //     if (shouldResolve) {
  //       resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
  //     } else {
  //       reject(`❌ Rejected promise ${position} in ${delay}ms`);
  //     }
  //   }, delay);
  // });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  // createButton.disabled = true;
  let firstDelay = Number(form['delay'].value);
  const step = Number(form['step'].value);
  for (let i = 1; i <= form['amount'].value; i += 1) {
    createPromise(i, firstDelay);
    // .then(({ position, delay }) => {
    //   Notify.success(value);
    // })
    // .catch(({ position, delay }) => {
    //   Notify.failure(error);
    // });
    firstDelay += step;
  }
  // createButton.disabled = false;
});
