import { Outlet } from "react-router-dom";
import Header from "../FixedComponent/Header/Header";
import Footer from "../Pages/Footer/Footer";

const Root = () => {
    return (
        <div>
            
            <Header></Header>
            <div className="min-h-screen md:min-h-[150vh] lg:min-h-[70vh]">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;