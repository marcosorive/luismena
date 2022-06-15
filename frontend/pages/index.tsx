import type { NextPage } from 'next'
import { ImageSlider } from "../components/imageSlider";
import { GetStaticProps } from 'next'
import { API_PATHS } from "../constants";
import { fetchAPI } from "../utils/api";
import { imagesToSliderImages } from "../utils/utils";
import { InstagramLogo } from "../resources/instagramLogo";
const Home: NextPage = (props: any) => {
  const { homePage } = props;
  const sliderImages = imagesToSliderImages(homePage.Imagenes);
  return <div>
    <ImageSlider images={sliderImages} />
    <footer>
      <InstagramLogo></InstagramLogo>
      <InstagramLogo></InstagramLogo>
    </footer>
  </div>
}

export const getStaticProps: GetStaticProps = async () => {
  const pages = await fetchAPI(API_PATHS.pages);
  const homePage = await fetchAPI(API_PATHS.homePage);
  return {
    props: { pages, homePage }
  }
}

export default Home
