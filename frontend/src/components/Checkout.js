import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";
import "./Checkout.css";

const Checkout = () => {
  const [{ basket }, dispatch] = useStateValue();

  const [orderData, setOrderData] = useState({
    items: [],
    name: "",
    email: "",
    address: "",
    phone: "",
    total: "",
  });

  useEffect(() => {
    const totalAmount = getBasketTotal(basket);

    setOrderData((prevState) => ({
      ...prevState,
      items: basket.map((item) => ({
        id: item.id,
        name: item.name,
        desc: item.desc || "",
        price: item.price,
        category: item.category || "",
      })),
      totalproducts: basket?.length,
      total: totalAmount,
    }));
  }, [basket]);

  const handleRemove = (itemId) => {
    dispatch(removeFromBasket(itemId));
  };

  const removeFromBasket = (itemId) => ({
    type: 'REMOVE_FROM_BASKET',
    payload: itemId
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("items")) {
      const [itemIndex, itemKey] = name.split("-");
      setOrderData((prevState) => ({
        ...prevState,
        items: prevState.items.map((item, index) =>
          index === parseInt(itemIndex) ? { ...item, [itemKey]: value } : item
        ),
      }));
    } else {
      setOrderData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      dispatch({
        type: "CLEAR_BASKET",
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const total = getBasketTotal(orderData.items);

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="order-heading">Order</h2>
      <div className="form-cart-container">
        <div className="form-container">
          <div className="checkout-form__container">
            <div className="checkout-form__card">
              <h3>Shipping details</h3>
              <div className="checkout-form__fields">
                <div className="checkout-form__field">
                  <label htmlFor="name" className="checkout-form__label">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="Name"
                    className="checkout-form__input"
                    required
                  />
                </div>
                <div className="checkout-form__field">
                  <label htmlFor="email" className="checkout-form__label">
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Email"
                    className="checkout-form__input"
                    required
                  />
                </div>
                <div className="checkout-form__field">
                  <label htmlFor="address" className="checkout-form__label">
                    Address:
                  </label>
                  <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    placeholder="Address"
                    className="checkout-form__input"
                    required
                  />
                </div>
                <div className="checkout-form__field">
                  <label htmlFor="phone" className="checkout-form__label">
                    Phone:
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    onChange={handleChange}
                    placeholder="Phone"
                    className="checkout-form__input"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cart-container">
          <h2 className="order-heading">Cart</h2>
          {basket.map((item, index) => (
            <fieldset className="cart-item" key={item.id}>
              {" "}
              {/* Use item ID as key */}
              <legend> {index + 1}</legend>
              <div className="cart-item-details">
                <label
                  htmlFor={`items-${index}-id`}
                  className="cart-item-label"
                >
                  ID:
                </label>
                <input
                  type="text"
                  name={`items-${index}-id`}
                  value={item.id}
                  readOnly
                  className="cart-item-input"
                />
              </div>
              <div className="cart-item-details">
                <label
                  htmlFor={`items-${index}-name`}
                  className="cart-item-label"
                >
                  Name:
                </label>
                <input
                  type="text"
                  name={`items-${index}-name`}
                  value={item.name}
                  readOnly
                  className="cart-item-input"
                />
              </div>
              <div className="cart-item-details">
                <label
                  htmlFor={`items-${index}-desc`}
                  className="cart-item-label"
                >
                  Description:
                </label>
                <textarea
                  name={`items-${index}-desc`}
                  value={item.desc}
                  readOnly
                  className="cart-item-textarea"
                />
              </div>
              <div className="cart-item-details">
                <label
                  htmlFor={`items-${index}-price`}
                  className="cart-item-label"
                >
                  Price:
                </label>
                <input
                  type="number"
                  name={`items-${index}-price`}
                  value={item.price}
                  readOnly
                  className="cart-item-input"
                />
              </div>
              <div className="cart-item-details">
                <label
                  htmlFor={`items-${index}-category`}
                  className="cart-item-label"
                >
                  Category:
                </label>
                <input
                  type="text"
                  name={`items-${index}-category`}
                  value={item.category}
                  readOnly
                  className="cart-item-input"
                />
              </div>
              <div className="cart-item-actions">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      <div className="order-summary">
        <div className="order-summary__total">
          <label>Total amount: </label>
          <input
            type="text"
            value={total}
            disabled
            className="order-summary__input"
          />
        </div>
        <button type="submit" className="checkout-form__submit">
          Place Order
        </button>
      </div>
    </form>
  );
};

export default Checkout;
