import type { NextPage } from 'next'
import { ImageSlider } from "../components/imageSlider";
import { GetStaticProps } from 'next'
import { API_PATHS } from "../constants";
import { fetchAPI } from "../utils/api";
import { imagesToSliderImages } from "../utils/utils";
import { InstagramLogo, FacebookLogo } from "../resources";

const Home: NextPage = (props: any) => {
  const { homePage } = props;
  const sliderImages = imagesToSliderImages(homePage.Imagenes);
  return <div>
    <ImageSlider images={sliderImages} />
    <footer>
      <section>© 2019 — LUIS MENA REGUEIRA</section>
      <section className='footer__logos'>
        <InstagramLogo />
        <FacebookLogo />
      </section>
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
