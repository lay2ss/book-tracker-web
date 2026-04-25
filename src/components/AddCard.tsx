import { getBooks } from "../services/bookService";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Book from "./Book";
import placeHolder from "../assets/icon/placeholder.png";

interface AddCardProps{
    onCancel: any;
}

const AddCard: React.FC<AddCardProps> = ({onCancel}) => {

    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState<any[]>([]);

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

  return (
    <main className="relative min-w-80">
        <div className="border border-white/20 p-4 rounded-xl bg-[#1a191b]">
        {loading? <Loading /> :
        (<div className="flex flex-wrap gap-3 sm:gap-5 font-inter text-sm sm:text-[16px] overflow-y-auto max-w-200 max-h-130">
                {books.map((book) => (
                    <Book key={book.id}  
                    cover={book.coverImage || placeHolder}
                    show="hidden"
                    showX="hidden"
                    showHover=""
                    hoverTitle={book.title}
                    select={true}/>  
                ))}
            </div>
        )}
            <div className="flex gap-2 pt-5 justify-end">
                <button className='h-min py-3 px-5 cursor-pointer text-[#1A1625] addButtonActived'>Add</button>
                <button onClick={onCancel} className='h-min py-3 px-5 cursor-pointer addButton'>Cancel</button>
            </div>
        </div>
    </main>
  )
}

export default AddCard