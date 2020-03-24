import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import CartItem from '../../models/cart-item';
import { DELETE_PRODUCT } from '../actions/products';

var qty=0; // cart quantity

const initialState = {
  items: {},
  totalAmount: 0,
  totalQty: 0 // total cart quantity
};

export default (state = initialState, action) => {
  
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        qty++; // increase cart quantity
        // already have the item in the cart so add 1 to qty and increase the product order sum
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice // product order sum
        );
      } else {
        qty++; // increase cart quantity
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice, // total order amount to line 22 in CartScreen.js
        totalQty: qty // return the total cart quantity to line 12 in HeaderButton2.js
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        qty--; // decrease cart quantity
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        qty--; // decrease cart quantity
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice, // total order amount to line 22 in CartScreen.js
        totalQty: qty // return the total cart quantity to line 12 in HeaderButton2.js
      };
    case ADD_ORDER:
      return initialState; // line 8
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal, // total order amount to line 22 in CartScreen.js
        totalQty: qty // return the total cart quantity to line 12 in HeaderButton2.js
      };
  }

  return state;
};
