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
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { setCartItems: updateItemsCount } = useContext(Context);
  const [totalPrice, setTotalPrice] = useState(0);



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
  // Function to get the cart items using Axios
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
      // Send a DELETE request to the server to remove the item from the cart
      await axios.delete(`${apiDomain}/cart/${cartItemId}`);

      // Refresh the cart items by calling the getCartItems function again
      getCartItems();
      // Get the name of the removed item to show it in the notification
      const removedItem = cartItems.find((item) => item.cart_id === cartItemId);

      // Show the success notification

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
    // Calculate the total price whenever cartItems change
    const calculateTotalPrice = () => {
      console.log(cartItems)
      const totalPrice = cartItems.reduce(
        (sum, item) => sum + (item.price || 0), // Use optional chaining to safely access item.price
        0
      );
      return totalPrice;
    };

    // Call the calculateTotalPrice function and update the totalPrice state
    setTotalPrice(calculateTotalPrice());
  }, [cartItems]);

  return (
    <>
      <ToastContainer />

      <section class="section-content bg padding-y border-top">
        <div class="container">

          <div class="row">
            <main class="col-sm-9">


              <div class="card">
                {!cartItems[0] && <CartFallback />}
                {cartItems && (
                  <table class="table table-hover shopping-cart-wrap">
                    <thead class="text-muted">
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col" width="120">Quantity</th>
                        <th scope="col" width="120">Price</th>
                        <th scope="col" class="text-right" width="200">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <figure class="media">
                              <div class="img-wrap"><img src={apiDomain + "/image/" + parseImageLink(item.ImageLink)} class="img-thumbnail img-sm" /></div>
                              <figcaption class="media-body">
                                <h6 class="title text-truncate">{item.Name} </h6>
                              </figcaption>
                            </figure>
                          </td>
                          <td>
                            <span>Số lượng: {item.quantity}</span>
                          </td>
                          <td>
                            <div class="price-wrap">
                              <var class="price">{item.price}.000VNĐ</var>
                            </div>
                            {/* <!-- price-wrap .// --> */}
                          </td>
                          <td class="text-right">
                            <button class="btn btn-outline-danger" onClick={() => handleRemoveItem(item.cart_id)}> × Remove</button>
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
            <aside class="col-sm-3">
              <p class="alert alert-success">Add USD 5.00 of eligible items to your order to qualify for FREE Shipping. </p>
              {/* <dl class="dlist-align">
                <dt>Total price: </dt>
                <dd class="text-right">USD 568</dd>
              </dl> */}
              {/* <dl class="dlist-align">
                <dt>Discount:</dt>
                <dd class="text-right">USD 658</dd>
              </dl> */}
              <dl class="dlist-align h4">
                <dt>Total:</dt>
                <dd class="text-right"><strong>{totalPrice}.000VNĐ</strong></dd>
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
              <button class="btn btn-success btn-lg btn-block ">   <Link to="/create-order"> Thanh Toán</Link>
              </button>
            </aside>
            {/* <!-- col.// --> */}
          </div>

        </div>
        {/* <!-- container .//  --> */}
      </section>


      {/* <div className="cart sm:flex justify-around p-4">
        <div className="flex flex-col gap-4">
          {!cartItems[0] && <CartFallback />}
          {cartItems.map((item) => (
            <div key={item.cart_id} className="flex gap-10 cursor-pointer select align-middle">
              <div className="rounded-[5px] h-[10rem]">
                <img
                  className="rounded-[10px] h-full object-contain mb-4"
                  src={apiDomain + "/image/" + parseImageLink(item.ImageLink)}
                  alt="product"
                />
              </div>


              <div >
                <h3 className="font-bold hover:text-red-500 transition-all duration-300">
                  {item.Name}
                </h3>
                <p className="flex justify-between inline-block group font-bold">
                  <span className="font-bold text-red-500 ">{item.price}.000VNĐ</span>
                  <span>Số lượng: {item.quantity}</span>
                </p>
                <br />
                <button className="bg-[gray] text-white rounded-[20px] px-3 py-1 w-fit flex items-center gap-2" onClick={() => handleRemoveItem(item.cart_id)}>
                  <FaTrash /> Loại bỏ
                </button>

              </div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-bold mb-4 hover:text-red-500 cursor-pointer">
            Giỏ hàng của bạn
          </h3>
          <hr />
          <div>
            <p className="mb-4 font-bold">Tổng:</p>
            <p className="font-bold mb-4">{totalPrice}.000VNĐ</p>
    

            <div>
              <button
                className="bg-black text-white px-8 py-3 rounded mb-4 w-full"
              >
                <Link to="/create-order"> Thanh Toán</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr /> */}
    </>
  );
};

export default Cart;
