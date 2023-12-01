import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { apiDomain } from "../../../utils/utilsDomain";
import CartFallback from "./FallBack";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../../../context/Context";
import '../../../css/cart/bootstrap.css'
import '../../../css/cart/responsive.css'
import '../../../css/cart/ui.css'


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { setCartItems: updateItemsCount } = useContext(Context);
  const [totalPrice, setTotalPrice] = useState(0);

  // const getapi = async () => {
  //   const response = axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1`);
  //   console.log('====================================');
  //   console.log(response.data);
  //   console.log('====================================');
  // }

  const parseImageLink = (imageLink) => {

    try {
      const imageArray = JSON.parse(imageLink);
      if (Array.isArray(imageArray) && imageArray.length > 0) {
        return imageArray[0];
      }
    } catch (error) {
      console.error('Error parsing ImageLink:', error);
    }
    return null;
  };
  const getCartItems = async () => {
    try {
      const response = await axios.get(`${apiDomain}/cart`);
      setCartItems(response.data);
      updateItemsCount(response.data)
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  useEffect(() => {
    getCartItems();
    console.log(cartItems);

  }, []);
  const handleRemoveItem = async (cartItemId) => {
    try {

      await axios.delete(`${apiDomain}/cart/${cartItemId}`);
      getCartItems();
      const removedItem = cartItems.find((item) => item.cart_id === cartItemId);
      toast.success(`${removedItem.Name} has been removed from the cart.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      console.log(cartItems)
      const totalPrice = cartItems.reduce(
        (sum, item) => sum + (item.price || 0),
        0
      );
      return totalPrice;
    };
    setTotalPrice(calculateTotalPrice());
  }, [cartItems]);

  return (
    <>
      <ToastContainer />

      <section className="section-content bg padding-y border-top">
        <div className="container">

          <div className="row">
            <main className="col-sm-12">


              <div className="card wrap table-responsive">
                {!cartItems[0] && <CartFallback />}
                {cartItems && (
                  <table className="table table-hover shopping-cart-wrap">
                    <thead className="text-muted">
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col" >Quantity</th>
                        <th scope="col" >Price</th>
                        <th scope="col" className="text-right" >Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <figure className="media">
                              <div className="img-wrap"><img src={apiDomain + "/image/" + parseImageLink(item.ImageLink)} className="img-thumbnail img-sm" /></div>
                              <figcaption className="media-body">
                                <h6 className="title text-truncate">{item.Name} </h6>
                              </figcaption>
                            </figure>
                          </td>
                          <td>
                            <span>Số lượng: {item.quantity}</span>
                          </td>
                          <td>
                            <div className="price-wrap">
                              <var className="price">{item.price}.000VNĐ</var>
                            </div>
                            {/* <!-- price-wrap .// --> */}
                          </td>
                          <td className="text-right">
                            <button className="btn btn-outline-danger" onClick={() => handleRemoveItem(item.cart_id)}> × Remove</button>
                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                )}

              </div>
              {/* <!-- card.// --> */}

            </main>
            {/* <!-- col.// --> */}
            <aside className="col-sm-3">
              <p className="alert alert-success">Add USD 5.00 of eligible items to your order to qualify for FREE Shipping. </p>
              {/* <dl class="dlist-align">
                <dt>Total price: </dt>
                <dd class="text-right">USD 568</dd>
              </dl> */}
              {/* <dl class="dlist-align">
                <dt>Discount:</dt>
                <dd class="text-right">USD 658</dd>
              </dl> */}
              <dl className="dlist-align h4">
                <dt>Total:</dt>
                <dd className="text-right"><strong>{totalPrice}.000VNĐ</strong></dd>
              </dl>
              <hr />
              {/* <figure class="itemside mb-3">
                <aside class="aside"><img src="images/icons/pay-visa.png" /></aside>
                <div class="text-wrap small text-muted">
                  Pay 84.78 AED ( Save 14.97 AED ) By using ADCB Cards
                </div>
              </figure>
              <figure class="itemside mb-3">
                <aside class="aside"> <img src="images/icons/pay-mastercard.png" /> </aside>
                <div class="text-wrap small text-muted">
                  Pay by MasterCard and Save 40%.
                  <br /> Lorem ipsum dolor
                </div>
              </figure> */}
              <button className="btn btn-success btn-lg btn-block ">   <Link to="/create-order"> Thanh Toán</Link>
              </button>
            </aside>
            {/* <!-- col.// --> */}
          </div>

        </div>
        {/* <!-- container .//  --> */}
      </section>
    </>
  );
};

export default Cart;
