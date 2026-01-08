import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useState } from "react";
import logoutIcon from "../assets/icon/logout.svg";
import profilePicture from "../assets/icon/placeholder_profile.png";
import menuBarIcon from "../assets/icon/menu_bar.svg";
import closeIcon from "../assets/icon/close.svg";
import logoname from "../assets/logo/logo_name.svg";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <nav className='w-full font-inter p-5 relative mx-auto'>
        <div className="flex justify-between w-[90vw] lg:w-[80vw] max-w-[1200px] mx-auto md:bg-[#252033] md:rounded-xl md:px-4 px-2 md:py-2">
            <a href="/" className="cursor-pointer">
                <img src={logoname} alt="logo name" className='w-40 h-min' />
            </a>
            <div className="hidden md:flex">
                <DesktopNav/>
            </div>
            <div className="flex gap-3 my-auto">
                <a href="/profile" className={`${location.pathname === "/profile" ? "border-2 border-white rounded-full" : "border-none"}`}>
                    <img src={profilePicture} alt="profile picture" className="w-min h-min cursor-pointer"/>
                </a>
                <button className="hidden md:flex cursor-pointer active:scale-95">
                    <img src={logoutIcon} alt="log out icon" />
                </button>
                <div className="relative flex md:hidden">
                    <button onClick={toggleMenu} className="z-10">
                        <img src={isOpen? closeIcon : menuBarIcon } alt="menu bar icon" className={`h-min my-auto cursor-pointer ${isOpen? 'hidden' : 'block'}`}/>
                    </button>
                    <div className={`fixed right-0 top-0 z-5 h-screen ${isOpen? 'flex' : 'hidden'}`}>
                        <MobileNav
                        toggle={toggleMenu}
                        />
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Nav