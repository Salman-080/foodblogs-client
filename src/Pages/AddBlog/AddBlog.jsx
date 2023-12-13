import { useContext } from 'react';
import Swal from 'sweetalert2'
import { AuthContext } from '../../Provider/Provider';
import { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
const AddBlog = () => {
    const { user } = useContext(AuthContext);

    const { data: Categories, isPending, isError, error } = useQuery({
        queryKey: ['Categories'],
        queryFn: async () => {
            const res = await axios.get('/category.json');

            // return res.data;

            return res.data;
        }
    });
    
    if (isPending) {
        return <div><Skeleton count={15} /></div>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    const handleAddBlog = e => {
        e.preventDefault();

        const dateTime = new Date();
        console.log(dateTime)

        const title = e.target.title.value;
        const category = e.target.category.value;
        const image = e.target.image.value;
        const shortDescription = e.target.shortDescription.value;
        const longDescription = e.target.longDescription.value;

        const blogDatas = { title, category, image, shortDescription, longDescription, dateTime: dateTime, userEmail: user?.email, userName: user?.displayName, userImage: user?.photoURL };

        // console.log(title,category,image, shortDescription, longDescription);

        axios.post("https://food-blog-server.vercel.app/Blogs", blogDatas, {withCredentials: true})
        .then(res=>{
            console.log(res.data);

            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Added',
                    text: 'Blog has been successfully added',

                })
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Not Added',
                    text: 'Blog has Not been Added',

                })
            }
        })

        // fetch("https://food-blog-server.vercel.app/Blogs", {
        //     method: "POST",
        //     headers: {
        //         "content-type": "application/json"
        //     },
        //     body: JSON.stringify(blogDatas)
        // })
        //     .then(res => res.json())
        //     .then(data => {
                

        //         // if (data.insertedId) {
        //         //     Swal.fire({
        //         //         icon: 'success',
        //         //         title: 'Successfully Added',
        //         //         text: 'Blog has been successfully added',

        //         //     })
        //         // }
              
        //     })

    }
    return (
        <div className="bg-[#fff6ea] py-14 md:py-36">

            <form onSubmit={handleAddBlog} className=" max-w-screen-xl mx-auto lg:w-[900px] p-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>

                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="title" id="" placeholder="Title" />
                    </div>
                    <div>

                        <select name="category" className="w-full border border-gray-400 rounded p-1">
                            <option disabled selected>Categories</option>

                            {/* <option value="Recipes">Recipes</option>
                            <option value="Cooking Tips and Techniques">Cooking Tips and Techniques</option>
                            <option value="Dessert Creations">Dessert Creations</option>
                            <option value="Quick and Easy Meals">Quick and Easy Meals</option> */}

                            {
                                Categories?.map(category => <option key={category.id} value={`${category.categoryName}`}>{category.categoryName}</option>

                                )
                            }

                        </select>
                    </div>
                    <div>

                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="image" id="" placeholder="image" />
                    </div>
                    <div>

                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="shortDescription" id="" placeholder="Short Description" />
                    </div>
                    <div>

                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="longDescription" id="" placeholder="Long Description" />
                    </div>
                </div>

                <br />
                <br />
                <div className="text-center">
                    <button className="btn btn-neutral w-full">Submit</button>
                </div>

            </form>

        </div>
    );
};

export default AddBlog;