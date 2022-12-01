import React, {createContext, useState} from 'react';

export const CartContext = createContext({
  ids: [],
  Qty: [],
  length: 0,
  width: 0,
  addCart: id => {},
  removeCart: id => {},
  resetCart: id => {},
  updateQuantity: id => {},
});

function CartContextProvider({children}) {
  const [CartId, setCartId] = useState([]);
  const [Quantity, setQuantity] = useState([]);
  const [length, setlength] = useState([]);
  const [width, setwidth] = useState([]);

  function addCartItem(id, Qty, length, width) {
    setCartId(currentCartId => [...currentCartId, id]);
    setQuantity(currentCartQty => [...currentCartQty, Qty]);
    setlength(currentlnth => [...currentlnth, length]);
    setwidth(currentwidth => [...currentwidth, width]);
  }

  function updateQuantity(id, Qty) {
    const IndexOF = CartId.findIndex(x => x._id === id);
    Quantity[IndexOF] = Qty;
  }

  function removeCartItem(id) {
    const IndexOF = CartId.findIndex(x => x._id === id);
    CartId.splice(IndexOF, 1);
    Quantity.splice(IndexOF, 1);
    width.splice(IndexOF, 1);
    length.splice(IndexOF, 1);
  }

  function resetCartItem() {
    setCartId([]);
    setQuantity([]);
    setlength([]);
    setwidth([]);
  }
  const value = {
    ids: CartId,
    Qty: Quantity,
    length: length,
    width: width,
    addCart: addCartItem,
    removeCart: removeCartItem,
    resetCart: resetCartItem,
    updateQuantity: updateQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContextProvider;
