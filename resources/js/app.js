import axios from 'axios'
import Noty from 'noty'
import {initAdmin} from './admin'
let addToCart = document.querySelectorAll('.add-to-cart');


function updateCart(pizza){
  axios.post('/update-cart',pizza).then(res=>{
    // console.log(res);
    cartCounter.innerText=res.data.totalQty;
    new Noty({
      type:'success',
      timeout:1000,
      text:'Item added to cart',
      progressBar:false,
      layout:'topRight'
    }).show();
  }).catch(err=>{
    new Noty({
      type:'error',
      timeout:1000,
      text:'Something went wrong',
      progressBar:false,
      layout:'topLeft'
    }).show();
  })
}

addToCart.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    // console.log(e);
    let pizza=JSON.parse(btn.dataset.pizza)
    updateCart(pizza)
    // console.log(pizza);
  });
});

// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}
initAdmin()
// Change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })

}

updateStatus(order);

