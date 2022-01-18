import { Navbar } from "../components/navbar";


export const Layout: React.ReactNode = (props: any) => {
    return (
        <>
            <Navbar />
            {props.children}
        </>
    )
};
