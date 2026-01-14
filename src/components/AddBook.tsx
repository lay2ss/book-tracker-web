import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../services/bookService";

const AddBook = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<any>(null);

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

    if (!book) return <div className="w-full flex justify-center text-gray-400 font-inter items-center h-screen"><p>Loading...</p></div>;

    const today = new Date();
    const monthYear = today.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric", 
    });

    return (
    <section className='h-screen w-full font-inter p-5 relative mx-auto text-white'>
        <main className='w-[90vw] lg:w-[80vw] max-w-[1200px] rounded-tl-2xl rounded-tr-2xl mx-auto bottom-0 left-1/2 transform -translate-x-1/2 h-screen absolute border-l-3 border-r-3 border-t-3 border-[#252033] p-5'>
        <h1 className="text-2xl font-bold purple-text text-center">Add Book to Library</h1>
        <div className="flex justify-between gap-10 mt-5">
            <div className="flex flex-col w-fit">
                <img src={book.coverImage || "src/assets/icon/placeholder.png"} alt={book.title} className="h-fit rounded-md gray-shadow min-w-50 w-fit" />
                <h1 className="text-xl font-bold mt-2">{book.title}</h1>
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
                        <button onClick={toggleState} className={isActive? "addButtonActived" : "addButton"}>Currently reading</button>
                        <button onClick={toggleState}  className={`right-10 ${isActiveRead? "addButtonActived" : "addButton"}` }>Finished</button>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold mt-13">
                        Completion Date
                    </h2>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="date" className="cursor-pointer appearance-none border-[#b99ef6] border w-4 h-4 rounded-md checked:bg-[#b99ef6]"/>
                        <label htmlFor="date">Use today's date &#40;{monthYear}&#41;</label>
                    </div>
                </div>
            </div>
        </div>
        </main>
    </section>
    )
    }

    export default AddBook