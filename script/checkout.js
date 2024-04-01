import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import { cart } from "../data/cart.js";

renderOrderSummary();

renderPaymentSummary();

updateCartQuantity();

function updateCartQuantity(){

  let cartQuantity = 0;
   
   cart.forEach((cartItem) => {
    cartQuantity +=cartItem.quantity;
   });

   document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

}
