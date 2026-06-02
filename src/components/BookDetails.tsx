import { useEffect, useState } from "react";
import { getBookById } from "../services/bookService";
import openBookIcon from "../assets/icon/open_book.svg";
import bookMarkIcon from "../assets/icon/bookmark_add.svg";
import closeIcon from "../assets/icon/close.svg";
import ExpandableText from "./ExpandableText";
import placeHolder from "../assets/icon/placeholder.png";
import { Link } from "react-router-dom";

interface BookDetailsProps {
    id: string;
    close: any;
}

const BookDetails: React.FC<BookDetailsProps> = ({id, close}) => {
    const [book, setBook] = useState<any>(null);
    const [isAdded, setIsAdded] = useState(false);

    const addToLibrary = () => setIsAdded(!isAdded);

    const stripHtmlTags = (html: string): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
    };

    useEffect(() => {
        const fetchBook = async () => {
        try {
            const data = await getBookById(id!);
            setBook(data);
        } catch (error) {
            console.error("Error loading book:", error);
        }
        };
        fetchBook();
    }, [id]);

    if (!book) return <div className="flex justify-center items-center w-full"> 
   <div className="animate-spin inline-block size-6 border-3 border-current border-t-transparent purple-text rounded-full mt-4" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
   </div>
    const splitArrayItems = (arr: string[]): string[] => {
    return arr.flatMap(item => item.split(" / ").map(str => str.trim()))
    .slice(0, 3);;
    };

    return (
        <section className='font-inter p-5 mx-auto text-white absolute z-8 top-0 md:top-40 left-1/2 transform -translate-x-1/2 h-full bg-white/0.1 backdrop-blur-xs w-full'>
            <main className='main-wrapper'>
                <div className="flex justify-center">
                    <div className="p-6 text-white bg-[#1a191b] rounded-xl flex gap-5 w-fit flex-col md:flex-row purple-border border relative">
                        <button className="transition-transform active:scale-80 absolute right-6 cursor-pointer" onClick={close}>
                            <img src={closeIcon} alt="close icon" />
                        </button>
                        <div className="flex flex-col items-center">
                            <img src={book.coverImage || placeHolder} alt={book.title} className="h-fit rounded-md gray-shadow min-w-35 w-fit" />
                            <div className="flex gap-2 flex-col mt-3 md:min-w-40">
                                <Link to={`/book/add/${id}`}>
                                    <button onClick={addToLibrary} className="bg-[#b99ef6] hover:bg-[#b99ef6]/80 text-[#252033] flex rounded-xl px-3 py-1 items-center font-bold cursor-pointer transition-transform active:scale-95">
                                        <img src={bookMarkIcon} alt="bookmark icon" />
                                        Add to Library
                                    </button>
                                </Link>                            
                            </div>
                        </div>
                        <div className="max-w-110">
                            <h1 className="text-xl font-bold max-w-95">{book.title}</h1>
                            <p className="text-sm purple-text font-light">
                                {book.authors?.join(", ")}
                            </p> 
                            <div className="flex gap-2 flex-wrap">
                                {Array.isArray(book.categories) ? splitArrayItems(book.categories).map((item: string, id: number) =>   
                                (<div className="border-[#b99ef6] border rounded-2xl w-fit px-2 flex mt-1 font-light text-sm" key={id}> 
                                    <p>{item}</p>
                                </div>)
                                ) : (<div className="border-[#b99ef6] border rounded-2xl w-fit px-2 flex mt-1 font-light text-sm"> 
                                    <p>{book.categories}</p>
                                </div> )}
                            </div>
                            <div className="flex gap-2 opacity-50 font-light mt-1 items-center">
                                    <p className="text-xs">{book.publishedYear}</p>
                                    <p>•</p>
                                    <div className="flex gap-1 text-xs items-center">
                                        <img src={openBookIcon} alt="book icon" className="h-5"/>
                                        <p>{book.pageCount} pages</p>
                                    </div>
                                </div>
                            <div className="md:max-h-55 overflow-y-auto">
                                <div  className="mt-4 md:min-w-100">
                                    <ExpandableText text={stripHtmlTags(book.description)} maxLength={350} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
    };

    export default BookDetails;