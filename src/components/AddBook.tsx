import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../services/bookService";
import DatePicker from "./DatePicker";
import Rating from "./Rating";

const AddBook = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<any>(null);

    const [checked, setChecked] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked);
 

    const [isActive, setIsActive] = useState(true);
    const [isActiveRead, setIsActiveRead] = useState(false);
    const toggleState = () => {isActiveRead === false? 
        (setIsActive(false), setIsActiveRead(true)) 
            : 
        (setIsActiveRead(false), setIsActive(true))};

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

    if (!book) return <div className="h-screen flex justify-center items-center w-full"> 
   <div className="animate-spin inline-block size-6 border-3 border-current border-t-transparent purple-text rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
   </div>
    

    const today = new Date();
    const monthYear = today.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric", 
    });

    return (
    <section className='section-wrapper'>
        <main className='main-wrapper md:py-25'>
            <h1 className="text-2xl font-bold  text-center">Add Book to Library</h1>
            <div className="flex justify-center gap-10 mt-5 flex-wrap lg:flex-nowrap lg:justify-between">
                <div className="flex flex-col w-fit items-center lg:max-w-60  max-w-120 lg:items-start">
                    <img src={book.coverImage || "src/assets/icon/placeholder.png"} alt={book.title} className="h-fit rounded-md gray-shadow min-w-50 w-fit" />
                    <h1 className="text-xl font-bold mt-2 text-center lg:text-start">{book.title}</h1>
                    <p className="text-sm purple-text font-light">
                        {book.authors?.join(", ")}
                    </p> 
                </div>
                <div className="w-full">
                    <div>
                        <h2 className="text-xl font-bold">
                            Reading Status
                        </h2>
                        <div className="flex mt-2 relative w-full">
                            <button onClick={toggleState} className={`absolute w-1/2 ${isActive? "addButtonActived" : "addButton"}`}>Reading</button>
                            <button onClick={toggleState}  className={`right-5 md:right-10 absolute w-1/2 ${isActiveRead? "addButtonActived" : "addButton"}` }>Finished</button>
                        </div>
                    </div>
                    <div className={`${!isActive? "block" : "hidden"}`}>
                        <h2 className="text-xl font-bold mt-13">
                            Completion Date
                        </h2>
                        <div className="flex flex-col lg:flex-row lg:gap-10 mt-2">
                            <div className="w-fit relative">
                                <div className={`bg-[#5453556c] p-5 w-30 ${checked? "absolute cursor-not-allowed" : "hidden"}`}></div>
                                <div className={`bg-[#5453556c] p-5 w-20 right-0 ${checked? "absolute cursor-not-allowed" : "hidden"}`}></div>
                                <DatePicker />  
                            </div>
                            <div className="flex gap-2 items-center mt-2 lg:mt-0">
                                <input type="checkbox" name="" id="todaysDate" className="cursor-pointer appearance-none  border w-4 h-4 rounded-full border-[#b99ef6] checked:bg-[#b99ef6]"
                                checked={checked}
                                onChange={handleChange}
                                />
                                <label htmlFor="todaysDate">Use today's date &#40;{monthYear}&#41;</label>
                            </div>
                        </div>
                    </div>
                    <div className={`${isActive? "block" : "hidden"}`}>
                        <h2 className="text-xl font-bold mt-13">
                            Current Page
                        </h2>
                        <div className="flex gap-2 items-center">
                            <input type="number" name="" id="currentPage" min={0} max={book.pageCount} className="border border-white/20 mt-2 max-w-18 focus:outline-[#b99ef6] rounded-md p-1" />
                            <label htmlFor="currentPage"></label>
                            <p>of {book.pageCount} pages</p>
                        </div>
                    </div>
                    <div className={`${!isActive? "block" : "hidden"}`}>
                        <div>
                            <h2 className="text-xl font-bold mt-4">
                                Your rating
                            </h2>
                            <div className="mt-2">
                                <Rating />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mt-4">
                                Personal note
                            </h2>
                            <textarea className="w-full h-32 p-3 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b99ef6] resize-none placeholder-white/30 mt-2 max-w-216" name="" id="note" placeholder="Loved it, hated it, or somewhere in between? Share your take."></textarea>
                            <label htmlFor="note"></label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full border-b border-white/10 py-3"/>
            <div className="w-full flex flex-col items-end">
                <div className="flex gap-2 pt-8 justify-end w-full">
                    <button className="addButtonActived transition-transform active:scale-98 w-2/3 md:w-60">Save</button>
                    <button className="w-1/3 addButton md:w-35 transition-transform active:scale-98">Cancel</button>
                </div>
                <button className="addButton transition-transform w-full active:scale-98 md:w-97 mt-3">Add to Collection</button>
            </div>
        </main>
    </section>
    )
    }

    export default AddBook