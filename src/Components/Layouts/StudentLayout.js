import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import StudentHeader from "./StudentHeader";

export default function StudentLayout(){
    return(
        <>
            <StudentHeader/>
            <Outlet/> {/* calls child page here */}
            <Footer/>
        </>
    )
}