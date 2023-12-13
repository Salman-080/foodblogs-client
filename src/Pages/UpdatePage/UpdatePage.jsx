import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/Provider";


const UpdatePage = () => {
    const {user}=useContext(AuthContext);
    const {id}=useParams();
    console.log(id)


    

    const { data: UpdateBlog, isPending, isError, error } = useQuery({
        queryKey: ['UpdateBlog'],
        queryFn: async () => {
            const res = await axios.get(`https://food-blog-server.vercel.app/update/${id}`);

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

    console.log(UpdateBlog)


    const handleUpdateBlog=e=>{
        e.preventDefault();
        
        

        const title=e.target.title.value;
        const category=e.target.category.value;
        const image=e.target.image.value;
        const shortDescription=e.target.shortDescription.value;
        const longDescription=e.target.longDescription.value;
        const userEmail= user?.email;

        const updatingBlogDatas={title,category,image,shortDescription,longDescription, userEmail};
        console.log(updatingBlogDatas)

        axios.put(`https://food-blog-server.vercel.app/updateBlogs/${UpdateBlog?._id}`,updatingBlogDatas, {withCredentials: true})
        .then(res=>{console.log(res.data)
        
            if(res.data.modifiedCount>0){
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Updated',
                    text: 'Blog has been Updated successfully',

                })
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Not Updated',
                    text: 'Blog has Not been Updated',

                })
            }
        
        
        })

    }

    return (
        <div className="bg-[#fff6ea] py-14 md:py-36">

            <form onSubmit={handleUpdateBlog} className=" max-w-screen-xl mx-auto lg:w-[900px] p-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <p>Title</p>
                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="title" id="" defaultValue={UpdateBlog.title} />
                    </div>
                    <div>
                        <p>Categories</p>
                        <select name="category" className="w-full border border-gray-400 rounded p-1">
                            <option disabled selected>{UpdateBlog.category}</option>

                            <option value="Recipes">Recipes</option>
                            <option value="Cooking Tips and Techniques">Cooking Tips and Techniques</option>
                            <option value="Dessert Creations">Dessert Creations</option>
                            <option value="Quick and Easy Meals">Quick and Easy Meals</option>

                        </select>
                    </div>
                    <div>
                        <p>Image</p>
                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="image" id="" defaultValue={UpdateBlog.image}/>
                    </div>
                    <div>
                        <p>Short Description</p>
                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="shortDescription" id="" defaultValue={UpdateBlog.shortDescription}/>
                    </div>
                    <div>
                        <p>Long Description</p>
                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="longDescription" id="" defaultValue={UpdateBlog.longDescription}/>
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

export default UpdatePage;