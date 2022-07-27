import { useStateContext } from "../lib/context";
import {
  CartWrapper,
  CartStyle,
  Card,
  CardInfo,
  EmptyStyle,
  Checkout,
} from "../styles/CartWrapper";
import { Quantity } from "../styles/ProductDetails";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import getStripe from "../lib/getStripe";

export default function Cart() {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } =
    useStateContext();

  //Payment
  const handleCheckout = async () => {
    const stripePromise = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
    const data = await response.json();
    await stripePromise.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <CartWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCart(false)}
    >
      <CartStyle
        layout
        initial={{ x: "50%" }}
        animate={{ x: 0 }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1>Your cart looks empty. Do some shopping!</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        {cartItems.length >= 1 &&
          cartItems.map((item) => {
            return (
              <Card
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.4 } }}
                key={item.slug}
              >
                <img
                  src={item.Image.data.attributes.formats.thumbnail.url}
                  alt={item.Title}
                />
                <CardInfo>
                  <h3>{item.Title}</h3>
                  <h3>₹{item.Price}</h3>
                  <Quantity>
                    <span>Quantity</span>
                    <button
                      onClick={() => {
                        onRemove(item);
                      }}
                    >
                      <AiFillMinusCircle />
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() => {
                        onAdd(item, 1);
                      }}
                    >
                      <AiFillPlusCircle />
                    </button>
                  </Quantity>
                </CardInfo>
              </Card>
            );
          })}
        {cartItems.length >= 1 && (
          <Checkout layout>
            <h3>Subtotal: ₹{totalPrice}</h3>
            <button onClick={handleCheckout}>Buy Now</button>
          </Checkout>
        )}
      </CartStyle>
    </CartWrapper>
  );
}
