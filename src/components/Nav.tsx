import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useState } from "react";
import menuBarIcon from "../assets/icon/menu_bar.svg";
import closeIcon from "../assets/icon/close.svg";
import logoname from "../assets/logo/logo_name.svg";
import b_purple_logo from "../assets/logo/b_purple_logo.svg";
import { Link } from "react-router-dom";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`w-full font-inter mx-auto fixed z-10 top-0 md:bg-white/0.5 md:backdrop-blur-sm md:border-b md:border-white/10 bg-white/0.5 ${!isOpen? "backdrop-blur-sm" : "" }`}>
        <div className="w-full mx-auto md:px-4 px-2">
            <div className="max-w-300 flex justify-between mx-auto p-5 items-center">
                <Link to="/" className="cursor-pointer flex gap-2 items-center">
                    <img src={b_purple_logo} alt="logo name" className='w-8 h-min' />
                    <img src={logoname} alt="logo name" className='w-14 h-min hidden md:block'/>
                </Link>
                <div className="hidden md:flex">
                    <DesktopNav/>
                </div>
                <div className="flex gap-3 my-auto">
                    <div className="relative flex md:hidden">
                        <button onClick={toggleMenu} className="z-10">
                            <img src={isOpen? closeIcon : menuBarIcon } alt="menu bar icon" className={`h-min my-auto cursor-pointer ${isOpen? 'hidden' : 'block'}`}/>
                        </button>
                        <div className={`fixed inset-0 z-50 transition-opacity duration-400 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={toggleMenu} />
                            <div className={`fixed right-0 top-0 w-[70vw] transition-transform duration-400 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                                <MobileNav toggle={toggleMenu} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Nav