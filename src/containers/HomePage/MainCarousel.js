import Carousel from "react-bootstrap/Carousel";
import styles from "./Home.module.scss";

function MainCarousel() {
  return (
    <Carousel className={styles.mainCarousel}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEORgTtwNvvLiR_CcYzu-tzjGjcySX_RctcBapWUxzSulv2hTvcEr0-sX0mPZZeiC1NBD4HI-3RU_ztUaj-f7buQDyPOr3g=w705-h867"
          alt="First slide"
        />
        <Carousel.Caption className={styles.carouselCaption}>
          <h3>智의 이름을 걸고</h3>
          <p>한식당 智는 여러분에게 최고의 경험을 선물하기 위하여 최선을 다해 서비스할 것입니다.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEORJiquGNC1LVNtWGl7SbqB99QC57o13AuX5oWdEAfGGH0Vf5_6hW_bT7iWn07rT2S_Xy0XUuICseMsWbVyTYtxYQDiDzg=w705-h867"
          className="d-block w-100"
          alt="Second slide"
        />

        <Carousel.Caption className={styles.carouselCaption}>
          <h3>고급스러운 한식의 매력을</h3>
          <p>최상의 재료, 수준 높은 요리로 한식의 새로운 경험을 선사해드리겠습니다.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEORw9ORe2f_vokmCWII9awans_OlQzJLQMAzYX5SZhzn9WMrI9hQ-4Us56jYu3I4vA7NMLZyQ-eNCr7JQ3Y9SCALfLVPZQ=w705-h8672"
          alt="Third slide"
        />

        <Carousel.Caption className={styles.carouselCaption}>
          <h3>전통을 중시하는</h3>
          <p>재료의 준비부터 플레이팅까지 한국 전통을 고수하여 수준 높은 한국 전통의 미를 느끼실 수 있습니다.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MainCarousel;
