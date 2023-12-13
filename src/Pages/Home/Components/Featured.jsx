import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { AuthContext } from "../../../Provider/Provider";
import Swal from "sweetalert2";

const Featured = () => {
    const { user } = useContext(AuthContext)
    const { data: featuredBlogs, isPending, isError, error } = useQuery({
        queryKey: ['featuredBlogs'],
        queryFn: async () => {
            const res = await axios.get('https://food-blog-server.vercel.app/Blogs')

            return res.data;
        }
    })
    console.log(featuredBlogs)

    if (isPending) {
        return <div><Skeleton count={5} /></div>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    const handleWishList = (blog) => {

        const userEmail = user?.email;
        const { title, category, image, shortDescription, longDescription } = blog;
        const wishListBlog = {
            blog_id: blog._id,
            title,
            category,
            image,
            shortDescription,
            longDescription,
            userEmail: userEmail
        }

        axios.post('https://food-blog-server.vercel.app/wishLists', wishListBlog)
            .then(res => {
                console.log(res.data)

                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully Added',
                        text: 'Blog has been successfully added to Your Whistlist',

                    })
                }
                else {
                    if (res?.data?.message) {
                        Swal.fire({
                            icon: 'error',
                            title: "Ooppsss!!!",
                            text: `${res.data.message}`,

                        })
                    }
                }

            })
            .catch(err => console.log(err))
    }
    return (
        <div className="mt-16 px-3">
            <div className="max-w-screen-xl mx-auto">
                <h2 className="text-4xl font-bold text-center">Recent Blogs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                    {
                        featuredBlogs?.map(featuredBlog => <div key={featuredBlog._id} className="card bg-base-100 shadow-xl">
                            <figure className="w-full h-[250px]"><img className="w-full h-full" src={featuredBlog.image} alt="img" /></figure>
                            <div className="card-body ">
                                <h2 className="card-title text-2xl font-semibold">{featuredBlog.title}</h2>
                                <p className="text-lg font-normal text-gray-500">{featuredBlog.category}</p>

                                <div className="card-actions mt-6">
                                    <button onClick={() => handleWishList(featuredBlog)} className="btn px-3 py-2 mx-auto bg-[#ff8200] text-white">Add To WishList</button>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>

        </div>
    );
};

export default Featured;