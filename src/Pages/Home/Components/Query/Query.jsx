import { useRef } from "react";
import emailjs from '@emailjs/browser';

const Query = () => {
    const form = useRef();
    const handleEmailSend=e=>{
        e.preventDefault();

        emailjs.sendForm('service_z2mm26n', 'template_8aoelxw', form.current, 'FUIwdY-mps8mLrUlY')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }
    return (
        <div>
             <h2 className="font-bold text-4xl mt-11 text-center ">Contact With Us</h2>
        
        <div className="mx-auto  flex justify-center mt-4">
           
            <form ref={form} onSubmit={handleEmailSend} className="bg-orange-200 px-6 py-10 w-[400px] md:w-[650px] space-y-3 ">
                

                    <div className="text-base space-y-1">
                        <h2>Name</h2>
                        <input className="w-full px-1 py-[5px]" type="text" name="name" id="" />
                    </div>
                    

            


                <div className="text-base space-y-1">
                    <h2>Email Address</h2>
                    <input className="w-full px-1 py-[5px]" type="email" name="email" id="" />
                </div>


                <div className="text-base">
                    <h2>Your Query</h2>
                    <textarea className="w-full px-1" name="query" id="" cols="30" rows="10"></textarea>
                </div>
                <div className="flex justify-center"><button className="btn bg-black  text-white"> Submit</button></div>
            </form>
        </div>
        </div>
    );
};

export default Query;