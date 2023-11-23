import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let cartSummaryHTML = '';

let calculation =  0;
            
showCalculation();

function updateCalculation(value){
    calculation+=value;
    showCalculation();
    saveCalculation();
}

function evaluateCalculation(){
    calculation = eval(calculation);
    showCalculation();
    saveCalculation();
}

function showCalculation(){
    document.querySelector('.quantity').innerHTML = calculation;
    document.querySelector('.items').innerHTML = 'Items: ('+calculation+')';
}

function saveCalculation(){
    localStorage.setItem('calculation',calculation);
}

let pretotal = 0.00;

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
      updateCalculation(1);
      evaluateCalculation();
      pretotal += matchingProduct.priceCents /100;
      pretotal *= cartItem.quantity;
      updateCart();
    }
  });

  

  cartSummaryHTML += `
    <div class="cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Wednesday, June 15
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
          ₹${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span class="product">
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" 
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, November 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, November 15
              </div>
              <div class="delivery-option-price">
              ₹4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, November 13
              </div>
              <div class="delivery-option-price">
              ₹9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
  `;

});


function updateCart() {
  document.querySelector('.payment-summary-money').innerHTML = '₹' + pretotal.toFixed(2);
  document.querySelector('.payment-summary-money-2').innerHTML = '₹' + (pretotal + 4.99).toFixed(2);
  document.querySelector('.payment-summary-money-3').innerHTML = '₹' + (pretotal/10).toFixed(2);
  document.querySelector('.payment-summary-money-4').innerHTML = '₹' + ((pretotal/10) + (pretotal + 4.99)).toFixed(2);
}

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      location.reload();
      updateCalculation(-1);
      evaluateCalculation();
      pretotal -= matchingProduct.priceCents /100;
      updateCart();
      
      container.remove();
      location.reload();
    });
  });


  // document.querySelectorAll('.js-update-link')
  // .forEach((link) => {
  //     // location.reload();
  //     updateCalculation(1);
  //     evaluateCalculation();
  //     // pretotal += matchingProduct.priceCents /100;
  //     cart.quantity +=1
  //     console.log('hello')
  //     updateCart();
  //     // location.reload();
  //   });

// updateCart();
/* <span class="update-quantity-link link-primary  js-update-link" data-product-id="${matchingProduct.id}">
              Update
            </span> */

// export let total = ((pretotal/10) + (pretotal + 4.99)).toFixed(2);
// export let Calculation = calculation;