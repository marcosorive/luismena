import Head from "next/head";
import { Navbar } from "../../components/navbar";
import { Hyperlink } from "../../Entities";
import { useRouter } from 'next/router';

interface LayoutProps {
    links: Hyperlink[],
    children: React.ReactNode
}

export function Layout({ links, children }: LayoutProps) {

    const router = useRouter();
    const currentPath = router.asPath;
    const currentPage = links.find(e => e.link === currentPath)
    const pageTitle = `${currentPage?.text} - Estudio Luis Mena`
    return (
        <>
            <Head>
                <meta charSet="UTF-8"></meta>
                <title>{pageTitle}</title>
                <meta name="description"></meta>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" ></meta>
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://www.estudioluismena.com/${currentPage?.link}`} />
                <meta property="og:image" content="" />
            </Head>
            <Navbar links={links} />
            {children}
        </>
    )
};
