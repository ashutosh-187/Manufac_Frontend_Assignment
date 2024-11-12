import logo from "../assets/logo.png";
import { LuGithub, LuLinkedin } from "react-icons/lu";
import { CgWebsite } from "react-icons/cg";

function Footer() {
    return (
        <div className="footer bg-gray-900 text-white mt-auto w-full">
            <div className="flex justify-center items-center">
                <div className="w-1/2 px-6">
                    <img src={logo} />
                </div>
                <div className="w-1/2 flex gap-10 justify-end px-20">
                <a href="https://github.com/ashutosh-187" className='hover:scale-150 transform transition duration-200'>
                    <LuGithub size={30} />
                </a>
                <a href="https://www.linkedin.com/in/ashutosh-tiwari-a938a6243/" className='hover:scale-150 transform transition duration-200'>
                    <LuLinkedin size={30} />
                </a>
                <a href="https://ashutosh-tiwari-portfolio.vercel.app/" className='hover:scale-150 transform transition duration-200'>
                    <CgWebsite size={30} />
                </a>
                </div>
            </div>
            <div className="flex justify-center">
                <h3 className="text-gray-400">
                    Submitted by:
                </h3>
            </div>
            <div className="flex justify-between px-10 text-gray-400">
                <h1 className="cursor-pointer hover:text-white transition duration-200">Ashutosh Tiwari</h1>
                <h1 className="cursor-pointer hover:text-white transition duration-200">work.withashutosh1807@gmail.com</h1>
                <h1 className="cursor-pointer hover:text-white transition duration-200">+91 6386175405</h1>
            </div>

        </div>
    );
}

export default Footer;
