
const CookingTips = () => {
    return (
        <div className="mt-12 p-4">
            <div className="max-w-screen-xl mx-auto flex flex-col-reverse md:flex-row gap-8 "> 
            <div className="lg:w-[1200px]">
                <img className="w-full" src="/tips.jpg" alt="" />
            </div>
            <div className="md:mt-14">
                <h2 className="text-4xl font-bold mb-6">Today's Tips!</h2>
                <p>Cook the ingredients in a particular order to make the dish appetizing and tasteful. For example onions should be added first, then garlic and then ginger and tomato as each veggie has its own cooking time.</p>
            </div>
            </div>
          
        </div>
    );
};

export default CookingTips;