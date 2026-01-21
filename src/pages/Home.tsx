import Book from "../components/Book";
import BookCard from "../components/BookCard";
import { searchBooks } from "../services/bookService";
import { useState } from "react";

const Home = () => {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSearch = async () => {
        if (!query) return;

        setRecentSearches((prev) => {
        const updated = [query, ...prev.filter((item) => item !== query)];
        return updated.slice(0, 5);
        });

        setLoading(true);

        try {
            const books = await searchBooks(query);
            setResults(books);
        } catch (error) {
            console.error("Error searching for books:", error);
        } finally {
        setLoading(false);
        setShowDropdown(false);
        }
    };

    const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };


  return (
    <section className='w-full font-inter px-5 relative mx-auto text-white'>
        <main className='w-[90vw] lg:w-[80vw] max-w-[1200px] rounded-2xl mx-auto md:mt-2 py-20'>
            <div className="flex flex-col mx-auto">
                <div className="p-5">
                    <div className="relative w-full">
                        <input 
                            type="text"
                            placeholder="Search for a book" 
                            value={query}
                            onChange={(e) => {setQuery(e.target.value), setShowDropdown(true);}}
                            onKeyDown={(e) => {
                            if (e.key === "Enter") {
                            e.preventDefault();
                            handleSearch();
                            }
                        }}
                            className="border-none py-2 px-3 rounded-md outline-none ring-1 ring-[#b99ef6] w-full focus:shadow-[0px_0px_19px_0px_rgba(185,158,246,0.9)]"/>
                        <button className="right-4 top-2 icon-style" onClick={handleSearch}>
                            <img src="src/assets/icon/search.svg" alt="search icon"/>
                        </button>
                        {showDropdown && recentSearches.length > 0 && query && (
                            <ul className="absolute top-full left-0 right-0 bg-dark mt-1 rounded-md z-10">
                            {recentSearches.map((item, i) => (
                                <li
                                key={i}
                                onClick={() => {
                                    setQuery(item);
                                    handleSearch();
                                }}
                                className="px-3 py-2 cursor-pointer hover:opacity-80"
                                >
                                {item}
                                </li>
                            ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="mt-2">
                    <div className="flex p-2 justify-center rounded-full border border-[#b99ef6] flex-wrap max-w-[250px] mx-auto">
                        <div className="flex items-center">
                        <div>
                            <img src="src/assets/icon/fire.svg" alt="fire icon" />
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
        <div className="w-full border-b border-white/10"/>
            <div className="p-5">
                <h1 className="text-2xl font-bold">Currently reading</h1>
                <div className="flex gap-3 sm:gap-4 pt-5 overflow-x-auto pb-5 font-inter font-semibold text-sm sm:text-[16px]">
                    <Book 
                        current={60}
                        total={140}
                        cover="src/assets/icon/placeholder.png"
                        title="Book title"/>
                </div>
            </div>
        <div className="w-full border-b border-white/10"/>
            <div className="p-5">
                <h1 className="text-2xl font-bold">Finished</h1>
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