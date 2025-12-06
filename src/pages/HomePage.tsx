import Book from "../components/Book";
import BookCard from "../components/BookCard";

const HomePage = () => {
  return (
    <section className='flex h-screen w-full font-inter flex-col p-5 relative mx-auto'>
        <div className="flex justify-between w-[90vw] md:w-[70vw] lg:w-[60vw] mx-auto">
            <img src="src/assets/logo/logo_name.png" alt="logo name" className='w-40' />
            <div className="flex my-auto gap-3">
                <img src="src/assets/icon/placeholder_profile.png" alt="profile picture" className="w-min h-min cursor-pointer" />
                <img src="src/assets/icon/menu_bar.svg" alt="menu bar icon" className="h-min my-auto cursor-pointer" />
            </div>
        </div>
        <main className='bg-white w-[90vw] md:w-[70vw] lg:w-[60vw] rounded-2xl mx-auto  -bottom-5 left-1/2 transform -translate-x-1/2 gray-text h-[92vh] absolute  gray-shadow'>
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
                <div className="bg-light-orange flex py-4 px-5 justify-between rounded-md border border-[#FF6C00] flex-wrap text-sm sm:text-[16px] max-w-[600px] mx-auto">
                    <div className="flex items-center">
                    <div>
                        <img src="src/assets/icon/book.svg" alt="book icon" />
                    </div>
                        <p className="ml-1"><span className="font-bold">3</span> books this month</p>
                    </div>
                    <div className="flex items-center">
                    <div>
                        <img src="src/assets/icon/calendar.svg" alt="calendar icon" />
                    </div>
                        <p className="ml-1">Reading streak: <span className="font-bold">5 days</span></p>
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