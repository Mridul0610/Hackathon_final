import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Master(){
    return(
        <>
            <Header/>
            <Outlet/> {/* calls child page here */}
            <Footer/>
        </>
    )
}