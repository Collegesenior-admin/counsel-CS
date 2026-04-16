import { PhoneCall, MailMinus } from 'lucide-react';

const Footer = () => {
    return (
        <>
            <footer className='max-w-378 mx-auto bg-gray-100 pt-36 md:pt-40 sm:pt-52'>
                    <div className='bg-[#001c54] relative h-220 sm:pt-5 pt-4'>
                        <div className='max-w-full absolute md:absolute -top-45 left-0 right-0 sm:absolute sm:m-5 mx-3 my-8 md:m-10 '>
                            <div className=" bg-[#F4F7FF] rounded-t-xl p-5 md:p-7 lg:p-7">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                                    {/* Left Column: Branding */}
                                    <div className="space-y-2 md:space-y-6">
                                        <h2 className="text-2xl md:text-4xl font-bold">
                                            Let's Connect
                                        </h2>
                                        <div className="space-y-1 md:space-y-2">
                                            <p className="text-blue-500 tracking-wider text-sm">
                                                Consult With Our Expert Consultants.
                                            </p>
                                            <div></div>
                                            <p className="text-lg md:text-2xl font-medium leading-tight opacity-60">
                                                Guidance Made Just For You.<br />
                                            </p>
                                            <span className="text-lg md:text-2xl font-medium leading-tight opacity-90">Trusted Industry Professionals.</span>
                                        </div>
                                    </div>

                                    {/* Right Column: Form */}
                                    <form className="space-y-3 md:space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Name Input */}
                                            <div className="relative border-b-2 border-gray-300 pb-2">
                                                <label className="block text-lg font-bold mb-2">Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Your Name Here"
                                                    className="w-full bg-transparent outline-none text-gray-600 placeholder-gray-400"
                                                />
                                            </div>
                                            {/* Mobile Input */}
                                            <div className="relative border-b-2 border-gray-300 pb-2">
                                                <label className="block text-lg font-bold mb-2">Mobile</label>
                                                <input
                                                    type="tel"
                                                    placeholder="+91 Your Number"
                                                    className="w-full bg-transparent outline-none text-gray-600 placeholder-gray-400"
                                                />
                                            </div>
                                        </div>

                                        {/* Email Input */}
                                        <div className="relative border-b-2 border-gray-300 pb-2">
                                            <label className="block text-lg font-bold mb-2">Email</label>
                                            <input
                                                type="email"
                                                placeholder="Your Mail ID Here"
                                                className="w-full bg-transparent outline-none text-gray-600 placeholder-gray-400"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="flex justify-end pt-4">
                                            <button
                                                type="submit"
                                                className="bg-[#0d68f2] text-white px-15 py-2 tracking-wider rounded-xl text-md hover:bg-blue-700 transition shadow-lg w-full md:w-auto"
                                            >
                                                Request for a Callback
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Floating Contact Bar (Blue Bar) */}
                            <div className="bg-[#0d68f2] rounded-b-xl relative z-20 py-3 px-8 md:px-12 flex flex-col md:flex-row items-center justify-end space-x-7  text-white space-y-4 md:space-y-2">
                                <p >
                                    Give us a call on or mail us at
                                </p>

                                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-2 md:space-x-10">
                                    {/* Phone */}
                                    <a href="tel:+919345623381" className="flex items-center space-x-2 hover:opacity-80 transition">
                                        <PhoneCall size={20} />
                                        <span>9345623381</span>
                                    </a>

                                    {/* Email */}
                                    <a href="mailto:hello@collegesenior.in" className="flex items-center space-x-2 hover:opacity-80 transition">
                                        <MailMinus size={20} />
                                        <span>hello@collegesenior.in</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
            </footer>
        </>

    );
};

export default Footer;
