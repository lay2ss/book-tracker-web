import Book from "../components/Book";
import BookCard from "../components/BookCard";
import { searchBooks } from "../services/bookService";
import { useState } from "react";

const Home = () => {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query) return;
        setLoading(true);
        try {
            const books = await searchBooks(query);
            setResults(books);
        } catch (error) {
            console.error("Error searching for books:", error);
        } finally {
        setLoading(false);
        }
    };

    const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };


  return (
    <section className='h-screen w-full font-inter p-5 relative mx-auto text-white'>
        <main className='w-[90vw] lg:w-[80vw] max-w-[1200px] rounded-tl-2xl rounded-tr-2xl mx-auto bottom-0 left-1/2 transform -translate-x-1/2  h-screen absolute border-l-3 border-r-3 border-t-3 border-[#252033]'>
        <div className="flex flex-col mx-auto">
            <div className="p-5">
                <div className="relative w-full">
                    <input 
                        type="text"
                        placeholder="Search for a book" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                        if (e.key === "Enter") {
                        e.preventDefault();
                        handleSearch();
                        }
                    }}
                        className="border-none py-2 px-3 rounded-md outline-none focus:ring-1 focus:ring-[#b99ef6] bg-dark-purple w-full"/>
                    <button className="right-4 top-2 icon-style" onClick={handleSearch}>
                        <img src="src/assets/icon/search.svg" alt="search icon"/>
                    </button>
                </div>
            </div>
            <div className="px-5 mt-3">
                <div className="flex py-4 px-5 justify-center rounded-xl border border-[#b99ef6] flex-wrap max-w-[400px] mx-auto">
                    <div className="flex items-center">
                    <div>
                        <img src="src/assets/icon/fire.svg" alt="calendar icon" />
                    </div>
                        <p className="ml-1">Reading streak: <span className="font-bold purple-text">5 days</span></p>
                    </div>
                </div>
            </div>
        </div>

        <div className="p-5">
            {loading? (<div className="flex justify-center items-center w-full"> 
   <div className="animate-spin inline-block size-6 border-3 border-current border-t-transparent purple-text rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
   </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {results.length > 0 ? (
              results.map((book) => (
                <BookCard
                  key={book.id}
                  title={truncateText(book.title, 25)}
                  description={truncateText(book.description, 90)}
                  cover={book.coverImage || "src/assets/icon/placeholder.png"}
                  authorName={book.authors?.join(", ")}
                  show="hidden"
                  id={book.id}
                  year={book.publishedYear}
                  genre={book.categories}
                  pages={book.pageCount}
                />
              ))
            ) : (
              <p></p>
            )}
          </div>
        )}
        </div>

            <div className="p-5">
                <h1 className="text-2xl font-bold purple-text">Currently reading</h1>
                <div className="flex gap-3 sm:gap-4 pt-5 overflow-x-auto pb-5 font-inter font-semibold text-sm sm:text-[16px]">
                    <Book 
                        current={60}
                        total={140}
                        cover="src/assets/icon/placeholder.png"
                        title="Book title"/>
                </div>
            </div>
            <div className="px-5">
                <h1 className="text-2xl font-bold purple-text">Finished</h1>
                <div className="flex gap-3 sm:gap-4 pt-5 pb-5 font-inter text-sm sm:text-[16px overflow-x-auto">
                    {/* <BookCard 
                        
                    /> */}
                </div>
            </div>
        </main>
    </section>
  )
}

export default Home