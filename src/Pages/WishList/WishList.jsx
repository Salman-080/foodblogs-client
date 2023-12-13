import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { AuthContext } from "../../Provider/Provider";
import Swal from "sweetalert2";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const WishList = () => {
    const { user } = useContext(AuthContext);
    const userEmail = user?.email;
    const [wishListBlogs, setWishListBlogs] = useState(null);




    const { data: wishList, isPending, isError, error } = useQuery({
        queryKey: ['wishList'],
        queryFn: async () => {
            console.log(userEmail)
            
                const res = await axios.get(`https://food-blogs-auth.web.app/wishLists?email=${userEmail}`,{withCredentials: true});
                console.log(wishListBlogs)
            // return res.data;

            return res.data;
            
            
            
        }
    });

    useEffect(() => {
        if (wishList) {
            setWishListBlogs(wishList)
        }
    }, [wishList])



    if (isPending) {
        return <div><Skeleton count={15} /></div>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    const handleDelete = (id) => {
        axios.post(`https://food-blogs-auth.web.app/delete/${id}`)
            .then(res => {

                console.log(res.data)
                if (res?.data?.deletedCount) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully Deleted',
                        text: 'Data Successfully Deleted',



                    })

                    const remaining = wishListBlogs?.filter(blog => blog._id !== id);
                    setWishListBlogs(remaining);
                }
            })
    }
    console.log(wishListBlogs)
    return (
        <div >
            <h2 className="text-center text-4xl font-bold mt-12">Your WhistLists</h2>
            <div className="max-w-screen-xl mx-auto mt-7">
                {
                    wishListBlogs?.map(blog => (

                        <div key={blog._id} className="flex flex-col gap-6 p-2">  <div className="card md:card-side bg-base-100 shadow-xl h-[500px] md:h-[240px] lg:h-[220px] pr-4">
                            <figure className="h-full md:w-[250px]"><img className="h-full w-full" src={blog.image} alt="Album" /></figure>
                            <div className="card-body">
                                <div className="space-y-2 flex flex-col ">
                                    <h2 className="card-title text-xl font-bold">{blog.title}</h2>
                                    <p className="text">{blog.category}</p>
                                    <p>{blog.shortDescription}</p>


                                </div>
                                <Link to={`/details/${blog.blog_id}`}><button className="btn btn-primary md:w-[90px] mt-2 w-full ">Details</button></Link>

                            </div>
                            <div className="card-actions md:flex md:items-center  ">
                                <button onClick={() => handleDelete(blog._id)} className="btn btn-primary w-[330px] md:w-auto mx-auto">Remove</button>
                            </div>
                            <br />
                        </div>
                        <hr />
                        </div>
                    ))
                }
            </div>


        </div>
    );
};

export default WishList;