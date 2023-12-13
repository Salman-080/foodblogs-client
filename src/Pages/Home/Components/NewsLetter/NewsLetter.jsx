import Swal from "sweetalert2";
import { useInView } from 'react-intersection-observer';

const NewsLetter = () => {


    const handleNewsLetter=e=>{
        e.preventDefault();
        const newsLetterEmail=e.target.newsLetterEmail.value;
        console.log(newsLetterEmail)

        if(newsLetterEmail){
            Swal.fire({
                icon: 'success',
                title: 'Thank you for subscribing to our newsletter',
                
                
              })
        }
    }
    return (
        <div className="bg-[#ffddb0] py-24 mt-16">
            <div className="max-w-screen-xl mx-auto text-center space-y-5">
                <div className="space-y-2">
                <h2 className="text-3xl font-bold">Get Connect To Our NewsLetter </h2>
                
                <p>Get latest news to your inbox.</p>
                </div>
               
                
                <form onSubmit={handleNewsLetter} >
                    <input className="px-4 py-4 w-[250px] md:w-[600px] rounded-l-xl" type="email" name="newsLetterEmail" id="" placeholder="Your Email" />
                    <button className="bg-black px-5 py-[17px] rounded-r-xl text-white">Submit</button>
                </form>
            </div>

        </div>
    );
};

export default NewsLetter;