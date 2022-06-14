import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from "../components/layout";
import { FIXED_LINKS } from "../constants";

function MyApp({ Component, pageProps }: AppProps) {
  const { pages } = pageProps;
  const navLinks = FIXED_LINKS.concat(pages.map((p: any) => ({ text: p.Titulo, link: `/${p.slug}` })));

  return <Layout links={navLinks} >
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
