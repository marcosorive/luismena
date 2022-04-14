import type { NextPage } from 'next'
import { Navbar } from "../components/navbar";
import { Layout } from "../components/layout";
import { ImageSlider } from "../components/imageSlider";
import { GetStaticProps } from 'next'
import { API_PATHS, FIXED_LINKS } from "../constants";
import { fetchAPI } from "../utils/api";
import { imagesToSliderImages } from "../utils/utils";

const Home: NextPage = (props: any) => {
  const { pages, homePage } = props;
  const sliderImages = imagesToSliderImages(homePage.Imagenes);
  return <ImageSlider images={sliderImages} />
}

export const getStaticProps: GetStaticProps = async () => {
  const pages = await fetchAPI(API_PATHS.pages);
  const homePage = await fetchAPI(API_PATHS.homePage);
  return {
    props: { pages, homePage }
  }
}

export default Home
