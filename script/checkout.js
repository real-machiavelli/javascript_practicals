import {cart, removeFromCart} from '../data/cart.js';

import {product} from '../data/products.js';

import {formatCurrency} from './util/money.js';

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

import {deliveryOptiions} from '../data/deliveryOptions.js'

let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
    const productId = cartItem.productId;


    let matchingProduct;

    product.forEach((product) => {

      if (product.id === productId){

        matchingProduct = product;
      }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptiions.forEach((option) => {
      if(option.id === deliveryOptionId){
        deliveryOption = option;
      }

    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDay, 'days');

    const dateTostring = deliveryDate.format('dddd, MMMM D');

      cartSummaryHTML +=  `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateTostring}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" 
          data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)}

        </div>
      </div>
    </div>
    </div>

  `;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {

  let html = '';

  deliveryOptiions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDay, 'days');

    const dateTostring = deliveryDate.format('dddd, MMMM D');

    const prizeString = deliveryOption.priceCents === 0 
    ? 'free'
    : `$${formatCurrency(deliveryOption.priceCents)} -`

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

   html += `
    <div class="delivery-option">
    <input type="radio" ${isChecked ? 'checked' : ''}
    class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
    <div>
      <div class="delivery-option-date">
        ${dateTostring}
      </div>
      <div class="delivery-option-price">
        ${prizeString} Shipping
      </div>
    </div>
  </div>
    `

  });

  return html;
}



document.querySelector('.js-cart-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () =>{
    const productId = link.dataset.productId;

    removeFromCart(productId);
    
    const container = document.querySelector(`.js-cart-item-container-${productId}`);

    container.remove();
  } )
})