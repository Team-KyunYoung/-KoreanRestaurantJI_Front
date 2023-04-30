import Carousel from "react-bootstrap/Carousel";
import styles from "./Home.module.scss";

function MainCarousel() {
  return (
    <Carousel className={styles.mainCarousel}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81q9P-qiPFfpxuit9UJN7651KVEqK_SZNw29_BOj_1fBf4DXAjuzB-vYNZzc0uf55yNErLHsir3S_Dn4C_pF0M-RL-MCJg=w848-h919"
          alt="First slide"
        />
        <Carousel.Caption className={styles.carouselCaption}>
          <h3>智의 이름을 걸고</h3>
          <p>한식당 智는 여러분에게 최고의 경험을 선물하기 위하여 최선을 다해 서비스할 것입니다.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81p9omK5a4fANCYeZ3mC3G-T69X0it7-i9Qy2jcJ6wJziBZFyJW_rKT5aTRxC0SvBMIHfskhNsK-MKpIuigQtighx6A7JQ=w848-h919"
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
          src="https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81okVjd7W2bNJWA2QrDTkOFGTbS1AbJPoufvql-ysv4EPWyXYwLjDxtH2BQ_nw3Sd6DlibROgsK8F6MdDylqycU86qtoFA=w848-h919"
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
