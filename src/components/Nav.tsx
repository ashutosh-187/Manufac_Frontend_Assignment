import logo from '../assets/logo.png';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

function Nav() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-2xl">
            
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-11 w-full mr-2" />
            </div>

            <div className="flex items-center gap-11 px-14">
                <a href="https://github.com/ashutosh-187" className='hover:scale-150 transition transform duration-200'>
                    <FaGithub size={24} />
                </a>
                <a href="https://www.linkedin.com/in/ashutosh-tiwari-a938a6243/" className='hover:scale-150 transition transform duration-200'>
                    <FaLinkedin size={24} />
                </a>
                <a href="https://ashutosh-tiwari-portfolio.vercel.app/" className='hover:scale-150 transition transform duration-200'>
                    <CgWebsite size={24} />
                </a>
            </div>
        </nav>
    );
}

export default Nav;
