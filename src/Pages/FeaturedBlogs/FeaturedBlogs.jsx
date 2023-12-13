import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Skeleton from "react-loading-skeleton";


import MUIDataTable from "mui-datatables";




const FeaturedBlogs = () => {
    const { data: TopTenPost, isPending, isError, error } = useQuery({
        queryKey: ['TopTenPost'],
        queryFn: async () => {
            const res = await axios.get('https://food-blog-server.vercel.app/featuredBlogsPosts');

            // return res.data;

            return res.data;
        }
    });
    console.log(TopTenPost)
    if (isPending) {
        return <div><Skeleton count={15} /></div>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }


    // const dataArray = TopTenPost

    //     .map((post, index) => ({
    //         Sl: index+1,
    //         BlogTItle: `${post?.title}`,
    //         BlogOwner: `${post?.userName}`,
    //         OwnerImage: `${post?.userImage}`,
           
    //         id: index,
    //     }));
    const columns = [
        {
            name: "SL",
            label: "SL",
            options: {
                filter: false,
                customBodyRender: (notUsing, idx, notUsingToo) => {
                    return idx.rowIndex+1;
                  },
            }
        },
     
        {
          name: "title",
          label: "Title",
          options: { filter: true },
        },
        {
            name: "userName",
            label: "Blog Owner",
            options: { filter: true },
        },
        {
          name: "userImage",
          label: "Owner Image",
          options: {
            filter: false, 
            customBodyRender: (ownerImage, tableMeta, updateValue) => {
              return (
                <img src={ownerImage} alt="Image" className="w-[40px] h-[40px] rounded-full" />
              );
            },
          },
        },
  
    
      ];
console.log(TopTenPost)
      
      
      const options = {
        filter: true,
        search:true,
        responsive: "",
        selectableRows: "none",
   
        
        
      };
      
      
      

    return (
        <div className="max-w-screen-xl mx-auto ">

          <div className="text-center mt-6 space-y-3 px-2">
            <h2 className="text-4xl font-semibold">Featured Posts</h2>
            <p className="text-red-500">These top 10 posts are shown according to the owner's long length Description.</p>
          </div>
            <div className=" px-4 mt-8">

				<MUIDataTable className=" md:w-auto"
				title={""}
               
				data={TopTenPost}
				columns={columns}
                options={options}
				
				/>



            </div>
        </div>
    );
};

export default FeaturedBlogs;