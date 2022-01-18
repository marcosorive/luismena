import type { NextPage } from 'next'
import { Navbar } from "../components/navbar";
import { ImageSlider } from "../components/imageSlider";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { API_PATHS, FIXED_LINKS } from "../constants";
import { fetchAPI } from "../utils/api";



const Home: NextPage = (props: any) => {
  const { pages, homePage } = props;
  const navLinks = FIXED_LINKS.concat(pages.map((p: any) => ({ text: p.Titulo, link: `/${p.slug}` })));
  const sliderImages = homePage.Imagenes.map((img: any) => ({ source: img.url }))
  return (
    <>
      <Navbar links={navLinks} />
      <ImageSlider images={sliderImages} />
    </>
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
