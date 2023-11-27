import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Product from "../../user/components/product/Product"


const Home = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))


  const [slideIndex, setSlideIndex] = useState(0);
  const [slidePlay, setSlidePlay] = useState(true);


  const slides = [
    {
      name: 'JBL TUNE 750TNC',
      title: 'Next-gen design',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati dolor commodi dignissimos culpa, eaque eos necessitatibus possimus veniam, cupiditate rerum deleniti? Libero, ducimus error? Beatae velit dolore sint explicabo! Fugit.',
      image: '/images/a1.png',
      animationDirection: 'top-down',
    },
    {
      name: 'JBL Quantum ONE',
      title: 'Ipsum dolor',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A optio, voluptatum aperiam nobis quis maxime corporis porro alias soluta sunt quae consectetur aliquid blanditiis perspiciatis labore cumque, ullam, quam eligendi!',
      image: '/images/a2.png',
      animationDirection: 'right-left',
    },
    {
      name: 'JBL JR 310BT',
      title: 'Consectetur Elit',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo aut fugiat, libero magnam nemo inventore in tempora beatae officiis temporibus odit deserunt molestiae amet quam, asperiores, iure recusandae nulla labore!',
      image: '/images/a3.png',
      animationDirection: 'left-right',
    },
  ];

  const hideAllSlide = () => {
    setSlideIndex(0);
  };

  const showSlide = () => {
    // No need to manually handle DOM manipulation
  };

  const nextSlide = () => setSlideIndex((prevIndex) => (prevIndex + 1 === slides.length ? 0 : prevIndex + 1));

  const prevSlide = () => setSlideIndex((prevIndex) => (prevIndex - 1 < 0 ? slides.length - 1 : prevIndex - 1));

  useEffect(() => {
    const slider = document.querySelector('.slider');

    const handleMouseOver = () => setSlidePlay(false);
    const handleMouseLeave = () => setSlidePlay(true);

    slider.addEventListener('mouseover', handleMouseOver);
    slider.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      slider.removeEventListener('mouseover', handleMouseOver);
      slider.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!slidePlay) return;
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [slideIndex, slidePlay]);


  useEffect(() => {
    if (!user) {
      return navigate("/auth/login")
    }
  }, [user])
  if (user) {
    return (
      <>
        <div className="hero">
          <div className="slider">
            <div className="container">
              {slides.map((slide, index) => (
                <div key={index} className={`slide ${index === slideIndex ? 'active' : ''}`}>
                  <div className="info">
                    <div className="info-content">
                      <h3 className={slide.animationDirection}>{slide.name}</h3>
                      <h2 className={`${slide.animationDirection} trans-delay-0-2`}>{slide.title}</h2>
                      <p className={`${slide.animationDirection} trans-delay-0-4`}>{slide.description}</p>
                      <div className={`${slide.animationDirection} trans-delay-0-6`}>
                        <button className="btn-flat btn-hover">
                          <span>shop now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={`img ${slide.animationDirection}`}>
                    <img src={slide.image} alt="" />
                  </div>
                </div>
              ))}
            </div>
            <button className="slide-controll slide-next" onClick={() => { nextSlide(); }}>
              <i className='bx bxs-chevron-right'></i>
            </button>
            <button className="slide-controll slide-prev" onClick={() => { prevSlide(); }}>
              <i className='bx bxs-chevron-left'></i>
            </button>
          </div>
        </div>
        {/* <!-- end hero section --> */}

        {/* <SellerProducts /> */}
        <Product />
        {/* <!-- blogs --> */}
        <div className="section">
          <div className="container">
            <div className="section-header">
              <h2>latest blog</h2>
            </div>
            <div className="blog">
              <div className="blog-img">
                <img src="./images/JBL_Quantum400_Lifestyle1.png" alt="" />
              </div>
              <div className="blog-info">
                <div className="blog-title">
                  Lorem ipsum dolor sit amet
                </div>
                <div className="blog-preview">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, eligendi dolore. Sapiente omnis numquam mollitia asperiores animi, veritatis sint illo magnam, voluptatum labore, quam ducimus! Nisi doloremque praesentium laudantium repellat.
                </div>
                <button className="btn-flat btn-hover">read more</button>
              </div>
            </div>
            <div className="blog row-revere">
              <div className="blog-img">
                <img src="./images/JBL_TUNE220TWS_Lifestyle_black.png" alt="" />
              </div>
              <div className="blog-info">
                <div className="blog-title">
                  Lorem ipsum dolor sit amet
                </div>
                <div className="blog-preview">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, eligendi dolore. Sapiente omnis numquam mollitia asperiores animi, veritatis sint illo magnam, voluptatum labore, quam ducimus! Nisi doloremque praesentium laudantium repellat.
                </div>
                <button className="btn-flat btn-hover">read more</button>
              </div>
            </div>
            <div className="section-footer">
              <a href="#" className="btn-flat btn-hover">view all</a>

            </div>
          </div>
        </div>
        {/* <!-- end blogs --> */}







      </>

    )
  }
}

export default Home;