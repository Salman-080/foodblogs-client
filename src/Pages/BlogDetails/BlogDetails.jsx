import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";
import Swal from "sweetalert2";

const BlogDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    // const [BlogDetails, setBlogDetails]= useState({})
    const [CommentsDetails, setCommentsDetails]=useState(null);
    const [renderAgain, setRenderAgain]=useState(false)
    console.log(id)

    const userEmail=user?.email;
    console.log(userEmail)

    // useEffect(()=>{
    //     axios.get(`https://food-blog-server.vercel.app/details/${id}?email=${user?.email}`)
    //     .then(res=>{
    //         setBlogDetails(res.data);
    //     })
    // },[])
    // console.log(BlogDetails)
    const { data: BlogDetails, isPending, isError, error } = useQuery({
        queryKey: ['BlogDetails'], 
        queryFn: async () => {
            
   
            const res = await axios.get(`https://food-blog-server.vercel.app/details/${id}`);

            // return res.data;

            return res.data;
        }
    });

    useEffect(()=>{
        axios.get(`https://food-blog-server.vercel.app/commentsInfo/${BlogDetails?._id}`)
        .then(res=>{
            console.log(res.data);
            setCommentsDetails(res.data);
        })
        console.log(BlogDetails?._id)
    },[BlogDetails, renderAgain])
  
   

    // const { data: Comments } = useQuery({
    //     queryKey: ['Comments'],
    //     queryFn: async () => {
    //         const res = await axios.get(`https://food-blog-server.vercel.app/commentsInfo/${BlogDetails._id}`);

    //         // return res.data;
    //         setCommentsDetails(Comments);
    //         return res.data;
    //     }
    // });
    // console.log(CommentsDetails)
    console.log(BlogDetails)
    if (isPending) {
        return <div><Skeleton count={15} /></div>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }



    const handleComments = e => {
        e.preventDefault();

        const commentsInfo = {

            comment: e.target.commentBox.value,
            blog_id: BlogDetails?._id,
            userEmail: user?.email,
            userImage: user?.photoURL,
            userName: user?.displayName
        }
        console.log(commentsInfo)
        // console.log(comment, blog_id);
        axios.post("https://food-blog-server.vercel.app/commentsInfo", commentsInfo)
            .then(res => {
                console.log(res.data)

                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully Added',
                        text: 'Comment has been successfully posted',

                    })

                    setRenderAgain(!renderAgain);

                }

            })


    }

    return (

        <div className="max-w-screen-xl mx-auto px-2">
            <div className="card lg:card-side bg-base-100 grid grid-cols-1 md:grid-cols-2">
                <figure className="h-[300px] md:h-[450px]"><img className="h-full" src={BlogDetails.image} alt="Album" /></figure>
                <div className="card-body">
                    <div className="space-y-3">
                    <h2 className="card-title text-2xl">{BlogDetails.title}
                    
                    </h2>
                    <p className=""><span className="font-bold">Category:</span> {BlogDetails.category}</p>
                    </div>
                    
                    <p className="w-full mt-1"><span className="font-bold">Short Details:</span> {BlogDetails.shortDescription}</p>
                    <p className="w-full"><span className="font-bold">Full Details:</span> {BlogDetails.longDescription}</p>
                    {
                        user?.email == BlogDetails?.userEmail && (
                            <div className="card-actions">
                        
                            <Link to={`/update/${BlogDetails._id}`}> <button className="btn btn-primary mt-2">Update Blog</button></Link>
                        </div>
                        )
                    }
                
                </div>
            </div>


            <div className="mt-12">
                <h2 className="text-3xl font-bold">
                    Comments
                </h2>
            </div>
            <div>
                {
                    CommentsDetails?.map(comment => <div className="flex gap-3 space-y-6 items-center" key={comment._id}>
                        <div className="w-[40px] h-[40px] rounded-full">
                            <img className="rounded-full" src={comment.userImage} alt="" />
                        </div>
                        <div className="bg-gray-200 px-2 py-3 space-y-1 rounded-lg">
                            <h2 className="text-lg font-bold">{comment.userName}</h2>
                            <p>{comment.comment}</p>
                        </div>
                    </div>)
                }

            </div>
            <br />
           
           {
            user?.email == BlogDetails?.userEmail ? (
                <h2 className="text-red-600 text-xl font-medium">BlogOwner can not comment on his own post!</h2>

            )
            :
            <div className="">
                
                <form onSubmit={handleComments}>
                    <textarea className="px-1 border border-black" name="commentBox" id="" cols="50" rows="10" placeholder="Give Your Opinions"></textarea>
                    <br />
                    <button className="btn btn-primary">
                        Submit
                    </button>
                </form>

            </div>
           }
            
        </div>



    );
};

export default BlogDetails;