class Cart {

  cartItems;
  localstorage;

  constructor(localstorage) {
    this.localstorage = localstorage;
    this.loadFormLocalstorage();

  }

  loadFormLocalstorage() {
  
    this.cartItems = JSON.parse(localStorage.getItem(this.localstorage));
  
  if (!this.cartItems) {
  this.cartItems = [{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  },
  {
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
  
  }
  }

     
  addToCart(productId){
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
     if (productId === cartItem.productId){
       matchingItem = cartItem;  
     }
    });
  
    if (matchingItem){
     matchingItem.quantity ++;
    } else{
     this.cartItems.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId:'1'
     });
  
    }
    this.saveToLocastorage();
  }
  
  saveToLocastorage(){
    localStorage.setItem(this.localstorage, JSON.stringify(this.cartItems));
  }
  
  removeFromCart(productId){
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });
  
    cart = newCart;
  
     this.saveToLocastorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
  
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
     if (productId === cartItem.productId){
       matchingItem = cartItem;   
     } 
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToLocastorage();
  }
  
}


const cart = new Cart("cart-oop");
const bussinessCart = new Cart('bussiness-cart');



console.log(cart);