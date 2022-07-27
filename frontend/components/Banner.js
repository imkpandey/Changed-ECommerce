import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import banner from "../public/banner.jpg";

const MainBanner = () => {
  return (
    <Banner>
      <BannerStyle>
        <h2>Change the way you dress</h2>
        <h3>Changed.</h3>
        <h1>SUMMER SALE</h1>
        <h2>USE CODE- 20OFF TO GET EXTRA 20% OFF ON ALL PRODUCTS</h2>
        <BannerImage>
          <Image src={banner} alt="banner" />
        </BannerImage>

        {/* <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div> */}
      </BannerStyle>
    </Banner>
  );
};

const Banner = styled.div`
  padding: 100px 40px;
  background-color: #1a1c20;
  position: relative;
  height: 500px;
  line-height: 0.9;
  width: 100%;
  font-size: 20px;
  overflow: hidden;
`;

const BannerStyle = styled.div`
  font-size: 20px;
  color: white;
  h2{
    font-weight: 100;
    color: #AFB3BA;

  }
  h3 {
    color: #AFB3BA;
    font-size: 4rem;
    font-weight: 400;
    margin-top: 1rem;

  }
  h1 {
    color: white;
    margin-top: 2rem;
    padding-bottom: 0.4rem;
    font-size: 3rem;
    text-transform: uppercase;
  }
`;

// .hero-banner-container button{
//    border-radius: 15px;
//   padding: 10px 16px;
//   background-color: #f02d34;
//   color: white;
//   border: none;
//   margin-top: 40px;
//   font-size: 18px;
//   font-weight: 500;
//   cursor: pointer;
//   z-index:10000 !important;
// }

// .hero-banner-container h3{
//   font-size: 4rem;
//   margin-top: 4px;
// }
// .hero-banner-container h1{
//   color: white;
//   font-size: 10em;
//   margin-left: -20px;
//   text-transform: uppercase;
// }
const BannerImage = styled.div`
  position: absolute;
  top: 0%;
  right: 0%;
  width: 50rem;
  height: 50rem;
`;

export default MainBanner;
