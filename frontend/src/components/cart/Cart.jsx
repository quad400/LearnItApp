import { Divider } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { fetchCart, fetchOrder } from "../../actions/cart";
import axios from "axios";
import QueryString from "query-string";
import Loader from "../../containers/Loader";
import { numberToPrice } from "../../constants";
const Cart = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { shoppingCart: data, loading: loadingCart } = useSelector(
    (state) => state.carts
  );
  const { data: order, loading: loadingOrder } = useSelector(
    (state) => state.loadOrders
  );
  const location = useLocation();
  const navigate = useNavigate();
  const show = false

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login", {
        state: {
          previousUrl: location.pathname
        }
      });
    }else{
      dispatch(fetchCart());
      dispatch(fetchOrder());
    }
    const values = QueryString.parse(location.search);

    if (values.success) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (values.canceled) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [dispatch,isAuthenticated,location.pathname]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      // const userId = user;
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_BACKEND_URL}order/create-checkout-session/${order.order_id}/`,
          config
        );
        dispatch(fetchOrder());
      } catch (error) {
      }
    }
  };

  const handleRemove = async (courseId) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      try {
        await axios.delete(
          `${process.env.REACT_APP_BASE_BACKEND_URL}order/cart/${courseId}/`,
          config
        );
        dispatch(fetchCart());
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="home">
      <h3>Shopping Cart</h3>
      <div className="cart_box">
        {loadingCart ? (
          <Loader />
        ) : (
          <div className="cart_container">
            <h4>{data?.total_item} Courses in cart</h4>
            <Divider />
            {data?.total_item !== 0 ? (
              data?.items.map((item) => {
                return (
                  <div className="cart">
                    <div className="left_box">
                      <div className="cart_image">
                        <img src={item.course.thumbnail} alt="cart_image" />
                      </div>
                      <div className="content">
                        <h4>{item.course.title}</h4>
                        <h5>{numberToPrice(item.course.price)}</h5>
                      </div>
                    </div>
                    <Link
                      className="link"
                      onClick={() => handleRemove(item.course.course_id)}
                    >
                      Remove
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="empty_cart">
                <h4>Your cart is empty</h4>

                <div className="tide">
                  <Link to="/" className="new">
                    continue shopping
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
        {loadingOrder ? (
          <Loader />
        ) : data.total_item !== 0 ? (
          <div className="cart_container cart_container_right">
            <form
              action={`${process.env.REACT_APP_BASE_BACKEND_URL}order/create-checkout-session/${order.order_id}/`}
              method="POST"
            >
              <div className="price">
                <h4>Total: </h4>
                <span className="price_input">{numberToPrice(data.total_price)}</span>
                
                {show && <input
                  type="number"
                  disabled
                  className="price_input"
                  value={data.total_price}
                />}
              </div>

              <button type="submit" className="checkout_btn">
                Checkout
              </button>
            </form>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Cart;
