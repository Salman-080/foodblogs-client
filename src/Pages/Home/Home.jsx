import Banner from "./Components/Banner";
import CookingTips from "./Components/CookingTips/CookingTips";
import Faq from "./Components/FAQ/Faq";
import Featured from "./Components/Featured";
import NewsLetter from "./Components/NewsLetter/NewsLetter";
import Query from "./Components/Query/Query";

const Home = () => {
    return (
    <div>
        <Banner></Banner>
        <Featured></Featured>
        <CookingTips></CookingTips>
        <Faq></Faq>
        
        <NewsLetter></NewsLetter>

        <Query></Query>
    </div>

        
    );
};

export default Home;