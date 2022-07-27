import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  //States
  const [quantity, setQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantities, setTotalQuantitites] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)


  //Increase product quantity
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  //Decrease product quantity
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity - 1 < 1) return 1;
      return prevQuantity - 1;
    });
  };

  //Add Product To Cart
  const onAdd = (product, quantity) => {
    //Total Price
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.Price * quantity
    );
    //Increase total quantity
    setTotalQuantitites(
      (prevTotalQuantities) => prevTotalQuantities + quantity
    );
    //Check if product is in the cart
    const exist = cartItems.find((item) => item.Slug === product.Slug);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.Slug === product.Slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };
  //Remove product
  const onRemove = (product) => {
    //Set Total Price
    setTotalPrice((prevTotalPrice) => prevTotalPrice - product.Price);

    //Remove from total quantities
    setTotalQuantitites((prevTotalQuantities) => prevTotalQuantities - 1);

    //Check if product exists
    const exist = cartItems.find((item) => item.Slug === product.Slug);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.Slug !== product.Slug));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.Slug === product.Slug
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  };

  return (
    <Context.Provider
      value={{
        quantity,
        setQuantity,
        increaseQuantity,
        decreaseQuantity,
        onAdd,
        onRemove,
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalQuantities,
        totalPrice,
        setQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);