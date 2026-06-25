import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addBook, getBookById } from "../services/bookService";
import placeHolder from "../assets/icon/placeholder.png";
import DatePicker from "../components/DatePicker";
import Rating from "../components/Rating";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import { updateBook } from "../services/bookService";
import { deleteBook } from "../services/bookService";
import { getBookByDbId } from "../services/bookService";
import AddCardCollections from "../components/AddCardCollections";
import heartActiveIcon from "../assets/icon/heart_active.svg";
import heartIcon from "../assets/icon/heart.svg";
import Alert from "../components/Alert";
import { useQueryClient } from "@tanstack/react-query";

const SaveBook = () => {
    const queryClient = useQueryClient();
    const { id } = useParams<{ id: string }>();
    const { dbId } = useParams<{ dbId: string }>();
    const [book, setBook] = useState<any>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
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
        setIsFavorite(!!bookData.isFavorite);
        
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
        queryClient.invalidateQueries({ queryKey: ["books"] });
        queryClient.invalidateQueries({ queryKey: ["collections"] });
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
            dbId,
            isFavorite
        );
        queryClient.invalidateQueries({ queryKey: ["books"] });
        alert("Book updated");
        navigate(-1);
        } catch (err) {
            console.error(err);
        }  finally {
            setLoading(false);
        }     
    };

    const handleDelete = async () => {

        setDeleting(true);

        try{
            await deleteBook(
            dbId
        );
        queryClient.invalidateQueries({ queryKey: ["books"] });
        queryClient.invalidateQueries({ queryKey: ["collections"] });
        alert("Book deleted");
        navigate('/home');
        } catch (err) {
            console.error(err);
        }  finally {
            setDeleting(false);
        }     
    };

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    };

    const [isActive, setIsActive] = useState(true);
    const [isActiveRead, setIsActiveRead] = useState(false);

    useEffect(() => {
        setLoading(true)
        const fetchBook = async () => {
        try {
            const data = await getBookById(id!);
            setBook(data);
        } catch (error) {
            console.error("Error loading book:", error);
        } finally {
            setLoading(false);
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
                    <div className="flex bg-white/5 rounded-md">
                        <img src={book.coverImage || placeHolder} alt={book.title} className="h-fit rounded-md gray-shadow min-w-50 w-fit" />
                        <div className={`flex top-2 right-2 w-10`}>
                            <button className="transition-transform active:scale-80 cursor-pointer mx-auto" onClick={() => setIsFavorite(!isFavorite)}>
                                <img src={isFavorite? heartActiveIcon : heartIcon} alt="star-icon" className="w-6"/>
                            </button>
                        </div>
                    </div>
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
                            <button onClick={() => {setIsActive(true), setIsActiveRead(false)}} className={`absolute w-1/2 ${isActive? "addButtonActived z-2" : "addButton z-0"}`}>Reading</button>
                            <button onClick={() => {setIsActive(false), setIsActiveRead(true)}}  className={`right-5 md:right-10 absolute w-1/2 ${isActiveRead? "addButtonActived" : "addButton"}` }>Finished</button>
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
                    <div className="flex gap-2 w-full mb-2">
                        <button onClick={location.pathname.startsWith("/book/add/")? handleSave : handleUpdate} disabled={loading} className="addButtonActived transition-transform active:scale-98 w-2/3 md:w-60">{loading? 
                                    (<Loading/>) 
                                    : 
                                    (<p>Save</p>)}</button>
                        <button onClick={() => navigate(-1)} className="w-1/3 addButton md:w-35 transition-transform active:scale-98">Cancel</button>
                    </div> 
                    <div className={`${location.pathname.startsWith("/book/add/")? "hidden" : ""}`}>
                        <Alert
                        buttonText="Delete"
                        loading={deleting}
                        handleDelete={handleDelete}
                        buttonAlert={(<span>Are you sure you want to delete this saved book?
                        <br />This action cannot be undone.</span>)}    
                        />
                    </div>
                </div>
                <button onClick={() => {setShowAddCard(true), handleScrollTop()}} className={`addButton transition-transform w-full active:scale-98 md:w-97 mt-3 ${location.pathname.startsWith("/book/add/")? "" : "hidden"}`}>Add to Collection</button>
            <AddCardCollections
              onCancel={() => {setShowAddCard(false), setSelectedCollectionsIds([])}}
              onSelect={handleSelectCollection}
              isSelected={selectedCollectionsIds}
              onAdd={() => setShowAddCard(!showAddCard)}
              isOpen={showAddCard}
            />
            </div>
        </main>
    </section>
    )
    }

    export default SaveBook