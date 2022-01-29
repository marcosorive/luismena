import type { NextPage } from 'next'
import { Navbar } from "../components/navbar";
import { Layout } from "../components/layout";
import { ImageSlider } from "../components/imageSlider";
import { GetStaticProps } from 'next'
import { API_PATHS, FIXED_LINKS } from "../constants";
import { fetchAPI } from "../utils/api";
import { ImagesToSliderImages } from "../utils/utils";

const Home: NextPage = (props: any) => {
  const { pages, homePage } = props;
  const navLinks = FIXED_LINKS.concat(pages.map((p: any) => ({ text: p.Titulo, link: `/${p.slug}` })));
  const sliderImages = ImagesToSliderImages(homePage.Imagenes);
  return (
    <Layout links={navLinks}>
      <ImageSlider images={sliderImages} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pages = await fetchAPI(API_PATHS.pages);
  const homePage = await fetchAPI(API_PATHS.homePage);
  return {
    props: { pages, homePage }
  }
}

export default Home
