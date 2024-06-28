import Carousel from 'react-bootstrap/Carousel';
import './style.css';
import ExampleCarouselImage1 from '../Slider/slider1.png';
import ExampleCarouselImage2 from '../Slider/slider2.png';
import ExampleCarouselImage3 from '../Slider/slider3.png';

const Slider = () => {
  return (
    <Carousel style={{ marginBottom: '50px' }}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ExampleCarouselImage1}
          alt="First slide"
        />

        <Carousel.Caption>
          <h3 className="slider_title ">Professional Electricians</h3>
          <p className="slider_desc">
            Power up your peace of mind with our top-notch electrical
            maintenance services – ensuring safety, reliability, and efficiency
            in every connection!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ExampleCarouselImage2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3 className="slider_title">Professional Farmers</h3>
          <p className="slider_desc">
            Harvest the best of nature with our innovative farming solutions –
            nurturing growth, sustainability, and bountiful yields for a greener
            tomorrow!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ExampleCarouselImage3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3 className="slider_title">Professional Mechanical</h3>
          <p className="slider_desc">
            Optimize your operations with our premier mechanical maintenance
            services – where precision, performance, and reliability meet for
            seamless productivity!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
