import { getBooks, addBooksToCollection } from "../services/bookService";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Book from "./Book";
import placeHolder from "../assets/icon/placeholder.png";

interface AddCardProps{
    onCancel: any;
    collectionId: any;
}

const AddCardBooks: React.FC<AddCardProps> = ({onCancel, collectionId}) => {

    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState<any[]>([]);
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

    useEffect(() => {
    const loadBooks = async () => {
        try {
        setLoading(true);
        const data = await getBooks();
        setBooks(data);
        } catch (error) {
        console.error("Failed to load books:", error);
        } finally {
        setLoading(false);
        }
    };

    loadBooks();
    }, []);

    const handleSelectBook = (id: string) => {
    setSelectedBookIds((prev) => 
        prev.includes(id) 
        ? prev.filter(bookId => bookId !== id) 
        : [...prev, id] 
    );
  };

  const handleSaveToCollection = async () => {
    try {
        setLoading(true);
        await addBooksToCollection(selectedBookIds, collectionId);
            alert("Books added!");
            window.location.reload();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
  };

  const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    };

  return (
    <section className="font-inter p-5 text-white absolute z-8 top-30 h-full bg-white/0.1 backdrop-blur-xs w-full left-1/2 transform -translate-x-1/2">
        <main className="relative w-fit min-w-80 mx-auto">
            <div className="border border-white/20 p-4 rounded-xl bg-[#1a191b]">
            {loading? <Loading /> :
            (<div className="flex flex-wrap gap-3 sm:gap-5 font-inter text-sm sm:text-[16px] overflow-y-auto max-w-200 max-h-130">
                    {books.map((book) => (
                        <Book key={book.id}
                        id={book.id}  
                        cover={book.coverImage || placeHolder}
                        show="hidden"
                        showX="hidden"
                        showHover=""
                        hoverTitle={book.title}
                        isSelected={selectedBookIds.includes(book.id)}
                        onSelect={handleSelectBook}/>  
                    ))}
                </div>
            )}
                <div className="flex gap-2 pt-5 justify-end">
                    <button onClick={() => {handleSaveToCollection(), handleScrollTop()}} disabled={selectedBookIds.length === 0} className='h-min py-3 px-5 cursor-pointer text-[#1A1625] addButtonActived'>Add</button>
                    <button onClick={() => {setSelectedBookIds([]), onCancel()}} className='h-min py-3 px-5 cursor-pointer addButton'>Cancel</button>
                </div>
            </div>
        </main>
    </section>
  )
}

export default AddCardBooks