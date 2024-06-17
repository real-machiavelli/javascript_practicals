function Cart(localstorage){

  const cart = {

    cartItems: undefined,
  
     loadFormLocalstorage() {
  
      this.cartItems = JSON.parse(localStorage.getItem(localstorage));
    
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
    },
  
    
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
  },
  
  saveToLocastorage(){
    localStorage.setItem(localstorage, JSON.stringify(this.cartItems));
  },
  
  removeFromCart(productId){
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });
  
    cart = newCart;
  
     this.saveToLocastorage();
  },
  
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
  
  };

  return cart;
}

const cart = Cart('cart-oop');
const bussinessCart = Cart('bussiness-cart');



cart.loadFormLocalstorage();

console.log(cart);