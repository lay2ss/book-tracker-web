import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addBook, getBookById } from "../services/bookService";
import placeHolder from "../assets/icon/placeholder.png";
import DatePicker from "./DatePicker";
import Rating from "./Rating";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";
import { updateBook } from "../services/bookService";
import { deleteBook } from "../services/bookService";
import { getBookByDbId } from "../services/bookService";
import AddCardCollections from "./AddCardCollections";

const SaveBook = () => {
    const { id } = useParams<{ id: string }>();
    const { dbId } = useParams<{ dbId: string }>();
    const [book, setBook] = useState<any>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [deleting, setdeleting] = useState(false);
    const [showAddCard, setShowAddCard] = useState(false);
    const [selectedCollectionsIds, setSelectedCollectionsIds] = useState<string[]>([]);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [readDate, setReadDate] = useState({ 
    month: new Date().getMonth(), 
    year: new Date().getFullYear() 
    });

    useEffect(() => {
    if (!dbId) return;
    const loadBookDetails = async () => {
      try {
        setLoading(true);
        const bookData = await getBookByDbId(dbId!); 
        
        bookData.status === "READING"? (setIsActive(true), setIsActiveRead(false)) : (setIsActive(false), setIsActiveRead(true));
        setRating(bookData.rating || 0);
        setComment(bookData.comment || "");
        setCurrentPage(bookData.currentPage || 0);
        
        setReadDate({
          month: bookData.readMonth - 1,
          year: bookData.readYear
        });
      } catch (error) {
            console.error("Error loading book details", error);
      } finally {
            setLoading(false);
        } 
    };

    loadBookDetails();
  }, [dbId]);

    const handleSave = async () => {

        setLoading(true);
        const status = isActive? "READING" : "FINISHED";

        try{
            await addBook(
            book, 
            status, 
            rating, 
            comment, 
            status === "READING"? 0 : readDate.month,
            status === "READING"? 0 : readDate.year, 
            currentPage, 
            isFavorite, 
            selectedCollectionsIds,
        );
        alert("Book saved");
        navigate('/home');
        } catch (err) {
            console.error(err);
        }  finally {
            setLoading(false);
        }     
    };

    const handleUpdate = async () => {

        setLoading(true);
        const status = isActive? "READING" : "FINISHED";

        try{
            await updateBook(
            status, 
            rating, 
            comment, 
            readDate.month,
            readDate.year, 
            currentPage,
            dbId
        );
        alert("Book updated");
        navigate('/home');
        } catch (err) {
            console.error(err);
        }  finally {
            setLoading(false);
        }     
    };

    const handleDelete = async () => {

        setdeleting(true);

        try{
            await deleteBook(
            dbId
        );
        alert("Book deleted");
        navigate('/home');
        } catch (err) {
            console.error(err);
        }  finally {
            setdeleting(false);
        }     
    };

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

    const handleSelectCollection = (id: string) => {
    setSelectedCollectionsIds((prev) => 
    prev.includes(id) 
    ? prev.filter(collectionId => collectionId !== id) 
    : [...prev, id] 
    );
  };

    if (!book) return <div className="h-screen flex justify-center items-center w-full"> 
   <div className="animate-spin inline-block size-6 border-3 border-current border-t-transparent purple-text rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
   </div>

    return (
    <section className='section-wrapper'>
        <main className='main-wrapper md:py-25'>
            <h1 className="text-2xl font-bold  text-center">{location.pathname.startsWith("/book/add/")? "Add Book to Library" : "Edit Book" }</h1>
            <div className="flex justify-center gap-10 mt-5 flex-wrap lg:flex-nowrap lg:justify-between">
                <div className="flex flex-col w-fit items-center lg:max-w-60  max-w-120 lg:items-start">
                    <img src={book.coverImage || placeHolder} alt={book.title} className="h-fit rounded-md gray-shadow min-w-50 w-fit" />
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
                        <h2 className="text-xl font-bold mt-15">
                            Completion Date
                        </h2>
                        <div className="flex flex-col lg:flex-row lg:gap-10 mt-2">
                            <div className="w-fit relative">
                                <DatePicker
                                initialMonth={readDate.month}
                                initialYear={readDate.year} 
                                onDateChange={(m, y) => setReadDate({ month: m, year: y })}/>  
                            </div>
                        </div>
                    </div>
                    <div className={`${isActive? "block" : "hidden"}`}>
                        <h2 className="text-xl font-bold mt-15">
                            Current Page
                        </h2>
                        <div className="flex gap-2 items-center">
                            <input type="number"
                            value={currentPage}
                            onChange={(e) => setCurrentPage(Number(e.target.value))} 
                            id="currentPage" 
                            min={0} 
                            max={book.pageCount} 
                            className="border border-white/20 mt-2 max-w-18 focus:outline-[#b99ef6] rounded-md p-1" />
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
                                <Rating 
                                onChange={setRating}
                                value={rating} />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mt-4">
                                Personal note
                            </h2>
                            <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)} 
                            className="w-full h-32 p-3 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b99ef6] resize-none placeholder-white/30 mt-2 max-w-216" name="" id="note" placeholder="Loved it, hated it, or somewhere in between? Share your take."></textarea>
                            <label htmlFor="note"></label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full border-b border-white/10 py-3"/>
            <div className="w-full flex flex-col">
                <div className="gap-2 pt-8 w-full flex flex-col sm:flex-row">
                    <div className="flex gap-2 w-full">
                        <button onClick={location.pathname.startsWith("/book/add/")? handleSave : handleUpdate} disabled={loading} className="addButtonActived transition-transform active:scale-98 w-2/3 md:w-60">{loading? 
                                    (<Loading/>) 
                                    : 
                                    (<p>Save</p>)}</button>
                        <button onClick={() => navigate('/home')} className="w-1/3 addButton md:w-35 transition-transform active:scale-98">Cancel</button>
                    </div> 
                    <button onClick={handleDelete} disabled={deleting} className={`py-3 px-5 border border-red-500 rounded-xl bg-red-500 cursor-pointer transition-transform active:scale-98 h-fit ${location.pathname.startsWith("/book/add/")? "hidden" : ""}`}>{deleting? 
                                    (<Loading/>) 
                                    : 
                                    (<p>Delete</p>)}</button>
                </div>
                <button onClick={() => setShowAddCard(!showAddCard)} className={`addButton transition-transform w-full active:scale-98 md:w-97 mt-3 ${location.pathname.startsWith("/book/add/")? "" : "hidden"}`}>Add to Collection</button>
            <div className={`${showAddCard? "absolute top-80 left-1/2 -translate-x-1/2" : "hidden"}`}>
              /* <AddCardCollections
              onCancel={() => {setShowAddCard(!showAddCard), setSelectedCollectionsIds([])}}
              onSelect={handleSelectCollection}
              isSelected={selectedCollectionsIds}
              onAdd={() => setShowAddCard(!showAddCard)}
              /> */
            </div>
            </div>
        </main>
    </section>
    )
    }

    export default SaveBook