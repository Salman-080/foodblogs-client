import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { AuthContext } from "../../Provider/Provider";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";


const AllBlogs = () => {
    const { user } = useContext(AuthContext)
    const [inputValue, setInputValue] = useState(null);
    const [Categories, serCategories] = useState(null);
    const [allBlogs, setAllBlogs] = useState(null);
    console.log(inputValue)
    console.log(user?.email)
    const { data: Blogs, isPending, isError, error } = useQuery({
        queryKey: ['Blogs'],
        queryFn: async () => {
            const res = await axios.get('https://food-blogs-auth.web.app/allBlogs');

            // return res.data;
            
            return res.data;
        }
    });

    useEffect(() => {
        fetch("/category.json")
            .then(res => res.json())
            .then(data => serCategories(data))
    }, [])

    useEffect(()=>{
        if(Blogs){
            setAllBlogs(Blogs);
        }
    },[Blogs])
    // const { data: Categories } = useQuery({
    //     queryKey: ['Categories'],
    //     queryFn: async () => {
    //         const res = await axios.get('/category.json');

    //         // return res.data;

    //         return res.data;
    //     }
    // })


    //console.log(allBlogs)
    console.log(Categories)

    if (isPending) {
        return <div><Skeleton count={15} /></div>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    const handleSearchBlogs = () => {
        const filteredBlogs = Blogs.filter(blog => blog.title == inputValue)
        //console.log(filteredBlogs)
        setAllBlogs(filteredBlogs)
    }

    const handleFilter = (categoryName) => {
        const filteredBlogs = Blogs.filter(blog => blog.category == categoryName);
        setAllBlogs(filteredBlogs)
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
        // blog.userEmail = userEmail;

        // fetch('https://food-blogs-auth.web.app/wishLists',{
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(blog)
        // })
        // .then(res=>res.json())
        // .then(data=>console.log(data))

        axios.post('https://food-blogs-auth.web.app/wishLists', wishListBlog)
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

    const handleAllButton=()=>{
        setAllBlogs(Blogs);
    }
    // console.log(allBlogs)
    return (
        <div className="mt-4">
            <h2 className=" text-lg md:text-3xl lg:text-4xl md:font-bold font-medium text-center mb-8">All Blogs</h2>
            <div className=" flex flex-col  space-y-4 relative">
                <div className="flex justify-center  mt-6 md:mt-auto">
                    <input onChange={e => setInputValue(e.target.value)} type="text" name="inputBox" placeholder="Search by Title" className="border border-black rounded-l-xl md:w-full max-w-xs px-2" />
                    <button onClick={handleSearchBlogs} className="px-5 py-3 bg-orange-500 rounded-r-xl text-white">Search</button>
                </div>
                <div className="flex-none border absolute bottom-[70px] md:bottom-0 -right-[-6%] md:-right-[-4%] lg:-right-[-15%] z-30">
                    <ul className="menu menu-horizontal px-[2px] bg-gray-200 py-[1px] md:py-[7px] rounded lg:rounded-none ">

                        <li>
                            <details>
                                <summary>
                                    Category
                                </summary>
                                <ul className="p-1 bg-base-100">
                                <li className="px-1 "><button onClick={handleAllButton} className="w-full">All</button><hr /></li>
                                    {
                                        Categories?.map(category => <li className="px-1 " key={category.id}><button onClick={() => handleFilter(category.categoryName)} className="w-full">{category.categoryName}</button><hr /></li>

                                        )
                                    }

                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-screen-xl mx-auto gap-7 mt-10 p-3">
                {
                    allBlogs?.length !== 0 ? (
                        allBlogs?.map(blog => <div key={blog._id} className=" w-[400px] bg-base-100 shadow-xl space-y-3">
                            <div className="md:h-[350px] w-full relative"><img className="h-full w-full" src={blog.image} alt="Shoes" />
                                <div className="bg-white absolute bottom-0 left-0 right-0 w-fit mx-auto px-4 py-1">
                                    <p className="text-xl font-medium">{blog.category}</p>
                                </div>
                            </div>
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-semibold mt-4">{blog.title}

                                </h2>

                                <div>
                                    <p className="text-gray-500">{blog.shortDescription}</p>
                                </div>


                            </div>
                            <div className=" flex flex-col gap-6 mb-4 px-3 py-3">
                                <button onClick={() => handleWishList(blog)} className="btn bg-orange-500 w-full text-white">Add to WishList</button>
                                <Link to={`/details/${blog._id}`}><button className="  btn bg-orange-500 w-full text-white">Details</button></Link>
                            </div>

                        </div>)) :
                        <h2 className="text-center">Sorry No data Found</h2>
                }
            </div>
        </div>
    );
};

export default AllBlogs;