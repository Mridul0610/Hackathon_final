import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import MentorHeader from "./MentorHeader";

export default function MentorLayout(){
    return(
        <>
            <MentorHeader/>
            <Outlet/> {/* calls child page here */}
            <Footer/>
        </>
    )
}