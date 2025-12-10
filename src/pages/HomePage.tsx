import { useState } from "react";
import Book from "../components/Book";
import BookCard from "../components/BookCard";
import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";

const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <section className='flex h-screen w-full font-inter flex-col p-5 relative mx-auto'>
        <div className="flex justify-between w-[90vw] lg:w-[80vw] max-w-[1200px] mx-auto md:bg-white md:rounded-xl md:px-4 px-2">
            <a href="/" className="cursor-pointer">
                <img src="src/assets/logo/logo_name.png" alt="logo name" className='w-40 h-min' />
            </a>
            <div className="hidden md:flex">
                <DesktopNav/>
            </div>
            <div className="flex gap-3 my-auto">
                <img src="src/assets/icon/placeholder_profile.png" alt="profile picture" className="w-min h-min cursor-pointer z-5"/>
                <button className="hidden md:flex cursor-pointer active:scale-95">
                    <img src="src/assets/icon/logout.svg" alt="log out icon" />
                </button>
                <div className="relative flex md:hidden">
                    <button onClick={toggleMenu} className="z-10">
                        <img src={isOpen? 'src/assets/icon/close.svg' : 'src/assets/icon/menu_bar.svg'} alt="menu bar icon" className={`h-min my-auto cursor-pointer ${isOpen? 'hidden' : 'block'}`}/>
                    </button>
                    <div className={`fixed right-0 top-0 z-5 h-screen ${isOpen? 'flex' : 'hidden'}`}>
                        <MobileNav
                        toggle={toggleMenu}
                        />
                    </div>
                </div>
            </div>
        </div>
        <main className='bg-white w-[90vw] lg:w-[80vw] max-w-[1200px] rounded-2xl mx-auto  -bottom-23 left-1/2 transform -translate-x-1/2 gray-text h-screen absolute'>
        <div className="flex flex-col mx-auto">
            <div className="p-5">
                <div className="relative w-full">
                    <input type="text" placeholder="Search for a book" className="border-none py-2 px-3 rounded-md outline-none focus:ring-1 focus:ring-[#FF6C00] bg-light-orange w-full input-shadow"/>
                    <button className="right-12 top-2 icon-style">
                        <img src="src/assets/icon/search.svg" alt="search icon"/>
                    </button>
                    <button className="right-3 top-2 icon-style">
                        <img src="src/assets/icon/filter.svg" alt="filter icon"/>
                    </button>
                </div>
            </div>
            <div className="px-5">
                <div className="bg-light-orange flex py-4 px-5 justify-center rounded-full border border-[#FF6C00] flex-wrap max-w-[600px] mx-auto">
                    <div className="flex items-center">
                    <div>
                        <img src="src/assets/icon/fire.svg" alt="calendar icon" />
                    </div>
                        <p className="ml-1">Reading streak: <span className="font-bold orange-text">5 days</span></p>
                    </div>
                </div>
            </div>
        </div>
            <div className="p-5 gray-text">
                <h1 className="text-2xl font-bold">Currently reading</h1>
                <div className="flex gap-3 sm:gap-4 pt-5 overflow-x-auto pb-5 font-inter font-semibold text-sm sm:text-[16px]">
                    <Book 
                        current={60}
                        total={140}
                        bookCover="src/assets/icon/placeholder.png"
                        bookTitle="Book title"/>
                </div>
            </div>
            <div className="p-5 gray-text bg-white">
                <h1 className="text-2xl font-bold">Finished</h1>
                <div className="flex gap-3 sm:gap-4 pt-5 pb-5 font-inter text-sm sm:text-[16px overflow-x-auto">
                    <BookCard 
                        bookTitle="Book title"
                        bookDescription="Book Description Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        bookCover="src/assets/icon/placeholder.png"
                        rate={10}
                        year={2025}
                        authorName="Author name"
                    />
                </div>
            </div>
        </main>
    </section>
  )
}

export default HomePage