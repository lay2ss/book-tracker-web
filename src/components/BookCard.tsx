import { Link } from "react-router-dom";
import { useState } from "react";
import BookDetails from "./BookDetails";
import openBookIcon from "../assets/icon/open_book.svg";
import bookmarkIcon from "../assets/icon/bookmark_add.svg";

interface BookCardProps{
    description: string;
    cover: string;
    title: string;
    authorName: string;
    year: number;
    rate?: number;
    show?: string;
    id: string;
    genre?: string;
    pages: number;
}

const BookCard: React.FC<BookCardProps> = ({ description, cover, title, authorName, year, rate, show = "", id, genre, pages }) => {
    const [card, setCard] = useState(false);

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    };

  return (
        <div className='flex font-inter rounded-2xl w-fit p-5 flex-col max-w-137.5 shrink-0 input-shadow border border-white/20 hover:border-[#b99ef6]'>
                <div className="flex gap-5 flex-wrap md:flex-nowrap">
                    <div className="relative flex justify-center w-full md:justify-start">
                        <img src={cover} alt="cover" className="rounded-md gray-shadow h-fit w-fit min-w-35"/>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="text-start">
                            <div className="flex justify-between">
                                <h2 className="font-bold text-xl">{title}</h2>
                            </div>
                            <p className="text-sm opacity-50 font-light">
                                {authorName}
                            </p>    
                            <div className={`bg-dark-purple rounded-xl w-fit py-1 px-2 text-sm tracking-wider ${show}`}>
                                <p>{rate}/10</p>
                            </div>
                            <div className="border-[#b99ef6] border rounded-2xl w-fit px-2 flex mt-1 font-light text-sm"> 
                                <p>{genre}</p>
                            </div>
                            <p className="mt-2 text-sm">{description}</p>
                            <div className="flex gap-2 opacity-50 font-light mt-1 items-center">
                                <p className="text-xs">{year}</p>
                                <p>•</p>
                                <div className="flex gap-1 text-xs items-center">
                                    <img src={openBookIcon} alt="book icon" className="h-5"/>
                                    <p>{pages} pages</p>
                                </div>
                            </div>
                        </div>
                            <div className="flex justify-between md:min-w-[340px] flex-col xs:flex-row gap-3 xs:gap-0 mt-2 md:mt-0">
                                <div className="flex gap-3 w-full flex-col xs:flex-row">
                                    <Link to={`/book/add/${id}`}>
                                        <button className="purple-bg text-[#252033] flex rounded-xl px-3 py-1 items-center font-bold cursor-pointer transition-transform active:scale-95 w-full xs:w-fit justify-center">
                                            <img src={bookmarkIcon} alt="bookmark icon" />
                                            Add to Library
                                        </button>
                                    </Link>
                                        <button className="rounded-xl px-3 py-1 border-[#b99ef6] border cursor-pointer transition-transform active:scale-95 w-full xs:w-fit" onClick={() => {setCard(true), handleScrollTop()}}>Read More</button> 
                                </div>
                            </div>
                    </div>
                </div>
                    {card && <BookDetails id={id} close={() => setCard(false)}/>}
            </div>
            )
}

export default BookCard;