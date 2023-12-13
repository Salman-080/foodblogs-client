import React from 'react';

const Faq = () => {
    return (
        <div className='mt-16'>
            <div className='max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-11'>
                <div className='text-center mx-auto'>
                    <h2 className='text-4xl font-bold'>Frequently Asked Questions</h2>
                </div>
                <div className='mx-auto space-y-5 px-3'>
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" checked="checked" />
                        <div className="collapse-title text-xl font-medium">
                        What is the main purpose of a food blog?
                        </div>
                        <div className="collapse-content">
                            <p>The main purpose of a food blog is to share culinary experiences, recipes, cooking tips, and food-related stories with a community of food enthusiasts.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                        Are the recipes on this blog suitable for beginners?
                        </div>
                        <div className="collapse-content">
                            <p> Yes, we approve a variety of recipes post, including those suitable for beginners with step-by-step instructions and tips.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                        Can I submit my own recipes to the blog?
                        </div>
                        <div className="collapse-content">
                            <p>Absolutely! We encourage our readers to submit their own recipes, and if they meet our guidelines, we'll feature them on the blog.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                        How can I get updates on new blog posts and recipes?
                        </div>
                        <div className="collapse-content">
                            <p>You can subscribe to our newsletter to receive updates on the latest blog posts and recipes directly in your inbox.</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Faq;