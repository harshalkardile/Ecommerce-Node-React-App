import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "./Orders.css";
import { baseurl } from "./baseURL";

const ProductList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState({});

  useEffect(() => {
    getOrders();
  }, []);

  const toggleItems = (orderId) => {
    setVisibleItems((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  const isItemsVisible = (orderId) => visibleItems[orderId] || false;

  const getOrders = async () => {
    setIsLoading(true);
    let result = await fetch(`${baseurl}/orders`);
    result = await result.json();
    setOrders(result);
    setIsLoading(false);
  };

  const deleteOrder = async (id) => {
    console.warn(id);
    let result = await fetch(`${baseurl}/order/${id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getOrders();
    }
  };

  return (
    <div className="order-grid-container">
      <h3 className="order-list-title">Order List</h3>
      {isLoading ? (
        <div className="loader-container">
          <ClipLoader color={"#123abc"} loading={isLoading} size={50} />
        </div>
      ) : (
        <div className="order-grid">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div className="order-card" key={order._id}>
                <div className="order-info">
                  <div className="info-item">
                    <span className="info-item-label">Order No:</span>
                    <span className="info-item-value">{index + 1}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-item-label">Name:</span>
                    <span className="info-item-value name-value">
                      {order.name}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-item-label">Email:</span>
                    <span className="info-item-value email-value">
                      {order.email}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-item-label">Address:</span>
                    <span className="info-item-value">{order.address}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-item-label">Phone:</span>
                    <span className="info-item-value">{order.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-item-label">Total:</span>
                    <span className="info-item-value total-value">
                      ₹{order.total}
                    </span>
                  </div>
                  <div className="info-item">
                    <button
                      className="expand-button"
                      onClick={() => toggleItems(order._id)}
                    >
                      Show Items
                    </button>
                  </div>
                  <div className="info-item">
                    <button
                      className="delete-button"
                      onClick={() => deleteOrder(order._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div
                  className={`order-items ${
                    isItemsVisible(order._id) ? "visible" : "hidden"
                  }`}
                >
                  <ul className="items-header">
                    <li className="header-item">Item Name</li>
                    <li className="header-item">Description</li>
                    <li className="header-item">Price</li>
                    <li className="header-item">Category</li>
                  </ul>
                  {order.items.map((item) => (
                    <ul className="item-details" key={item._id}>
                      <li className="item-data">{item.name}</li>
                      <li className="item-data item-desc">{item.desc}</li>
                      <li className="item-data">${item.price}</li>
                      <li className="item-data">{item.category}</li>
                    </ul>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <h1 className="no-results">No Results Found</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
