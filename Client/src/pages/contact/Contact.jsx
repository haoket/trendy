import { Link } from "react-router-dom";

import './Contact.css'
const Contact = () => {
  return (
    <>
      <div>
        <div class="contact-area d-flex align-items-center mt-5 mb-5">

          <div class="google-map">
            <div >
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.7332975516097!2d108.24978007468239!3d15.975298241946591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108997dc971f%3A0x1295cb3d313469c9!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVGjDtG5nIHRpbiB2w6AgVHJ1eeG7gW4gdGjDtG5nIFZp4buHdCAtIEjDoG4!5e0!3m2!1svi!2s!4v1701016608794!5m2!1svi!2s"
                id="googleMap" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>

          <div class="contact-info">
            <h2>Liên hệ với chúng tôi</h2>
            <p>Chúng tôi hân hạnh đem đến cho khách hàng những sản phẩm chất lượng nhất, cửa hàng chúng tôi luôn đặt uy tín lên hàng đầu.</p>

            <div class="contact-address mt-50">
              <p><span>Địa chỉ:</span> Hòa Khánh, thành phố Đà Nẵng</p>
              <p><span>SĐT:</span> 0386043213</p>
              <p><a href="mailto:contact@essence.com">levanhao0304@gmail.com</a></p>
            </div>
          </div>

        </div>

      </div> </>
  );
};

export default Contact;
