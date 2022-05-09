import Notiflix, { Notify } from 'notiflix';

const refs = {
  form: document.querySelector(".form"),
  delay: document.querySelector('input[name ="delay"]'),
  step: document.querySelector('input[name ="step"]'),
  amount: document.querySelector('input[name ="amount"]'),
  submitBtn:document.querySelector('button[type="submit"]'),
}
refs.form.addEventListener('click', onFormSubmit);

function onFormSubmit(evt){
const values={
  delay: parseInt(refs.delay.value),
  step: parseInt(refs.step.value),
  amount: parseInt(refs.amount.value),
}
evt.preventDefault();
promiseValues(values);
}
function promiseValues({delay, step, amount}){
  let finalDelay = delay;
  for( let i =1; i<= amount; i++){
    createPromise(i, finalDelay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    finalDelay += step;
  }
}

function createPromise(position, delay) {
  //const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      if (shouldResolve) {
        resolve({position: position, delay: delay}); // Fulfill
      } else {
        reject({position: position, delay: delay});
      }
    }, delay);
  })
  
}


  