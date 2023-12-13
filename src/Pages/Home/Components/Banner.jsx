import {motion} from 'framer-motion';
const Banner = () => {
    return (
        <div className="lg:h-[550px] bg-[#fff6ea] lg:flex lg:flex-row relative">
            <div className="h-full lg:w-[980px]">
                <img className="h-full w-full" src="/foodBlog.jpg" alt="" />
            </div>
            
            <motion.div
            initial={{y: -500}}
            animate={{y: 0}}
            transition={{delay: .8}}
             className="bg-[#fff6ea] lg:self-center lg:absolute lg:right-10  text-center py-16 px-7 md:mr-5 space-y-3">
                <h2
                    
                className="text-3xl font-bold ">Satisfy Your Cravings with FoodByte Blogs</h2>
                <p className="text-base lg:w-[900px] text-gray-600"> A delectable haven for food enthusiasts. Explore an array of culinary stories, share your favorite recipes, and join a thriving community of food bloggers. Unleash your culinary creativity and embark on a flavorful journey with us today!</p>
                <button className="btn bg-black text-white">SubsCribe</button>
            </motion.div>



        </div>
    );
};

export default Banner;