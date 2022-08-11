import Carousel from "react-bootstrap/Carousel";
import styles from "./Home.module.scss";

function MainCarousel() {
  return (
    <Carousel className={styles.mainCarousel}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://picsum.photos/1800/500"
          alt="First slide"
        />
        <Carousel.Caption className={styles.carouselCaption}>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://picsum.photos/2800/500"
          alt="Second slide"
        />

        <Carousel.Caption className={styles.carouselCaption}>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://picsum.photos/1200/300"
          alt="Third slide"
        />

        <Carousel.Caption className={styles.carouselCaption}>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MainCarousel;
