import Book from "../components/Book";
import BookCard from "../components/BookCard";
import searchIcon from "../assets/icon/search.svg";
import fireIcon from "../assets/icon/fire.svg";
import placeHolder from "../assets/icon/placeholder.png";
import { searchBooks, getBooks, getPreferences, getRecommendationsByGenres } from "../services/bookService";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Streak from "../components/Streak";

const Home = () => {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingFeed, setLoadingFeed] = useState(false);
    const [loadingDashboard, setLoadingDashboard] = useState(false);

    const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem("recent_book_searches");
    return saved ? JSON.parse(saved) : [];
    });

    const [showDropdown, setShowDropdown] = useState(false);
    const [books, setBooks] = useState<any[]>([]);
    const [recommendations, setRecommendations] = useState<any[]>([]);

    const handleSearch = async () => {
        if (!query.trim()) return;

        setRecentSearches((prev) => {
        const filtered = prev.filter((item) => item !== query.trim());
        const updated = [query.trim(), ...filtered].slice(0, 5);
        localStorage.setItem("recent_book_searches", JSON.stringify(updated));
        return updated;
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

    useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoadingFeed(true);
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to load books:", error);
      } finally {
        setLoadingFeed(false);
      }
    };

    loadBooks();
    }, []);

    useEffect(() => {
        const loadDashboard = async () => {
        try {
            setLoadingDashboard(true)
            const prefs = await getPreferences(); 
            const userGenres = prefs.favoriteGenres; 

        if (userGenres && userGenres.length > 0) {
            const booksFromGoogle = await getRecommendationsByGenres(userGenres);
            setRecommendations(booksFromGoogle);
        }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingDashboard(false);
        }
    };

    loadDashboard();
    }, []);

  return (
    <section className='section-wrapper'>
        <main className='main-wrapper'>
            <div className="flex flex-col mx-auto">
                <div className="p-5">
                    <div className="relative w-full">
                        <input 
                            type="text"
                            placeholder="Search for a book" 
                            autoComplete="off"
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
                            <img src={searchIcon} alt="search icon"/>
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
                            <img src={fireIcon} alt="fire icon" />
                        </div>
                            <p className="ml-1">Reading streak: <span className="font-bold purple-text">{loadingFeed? "..." : <Streak books={books}/>}</span></p>
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
                  cover={book.coverImage || placeHolder}
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
            <h1 className="text-2xl pb-5 font-bold">Your next reading?</h1>
            {loadingDashboard? <Loading/> 

            :
            
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-5 font-inter font-semibold">
                {recommendations.length > 0 ? (
                recommendations.map((book) => (
                    <BookCard
                    key={book.id}
                    title={truncateText(book.title, 25)}
                    description={truncateText(book.description, 90)}
                    cover={book.coverImage || placeHolder}
                    authorName={book.authors?.join(", ")}
                    show="hidden"
                    id={book.id}
                    year={book.publishedYear}
                    genre={book.categories}
                    pages={book.pageCount}
                    />
                ))
                ) : (
                (<p className="opacity-80 font-light">No recommendations yet :/</p>)
                )}
            </div>
            }
        </div>
        <div className="w-full border-b border-white/10"/>
        {loadingFeed? <div className="mt-50"><Loading/></div> : 
        (<div>
            <div className="p-5">
                <h1 className="text-2xl font-bold">Currently reading</h1>
                
                    <div>
                    {books.some(book => book.status === "READING")  ?
                        (<div className="flex gap-3 sm:gap-4 pt-5 overflow-x-auto pb-5 font-inter font-semibold text-sm sm:text-[16px]">
                                {books.map((book) => (book.status === "READING" &&
                                    <Link key={book.externalId} to={`/book/edit/${book.externalId}/${book.id}`}>
                                    <Book 
                                    current={book.currentPage}
                                    total={book.totalPage}
                                    cover={book.coverImage || placeHolder}
                                    title={book.title}
                                    showX="hidden"
                                    />
                                    </Link>
                                    ))}
                                </div>):
                        (<p className="opacity-80 font-light">Save some books :D</p>)}
                    </div>
                                        
            </div>
        <div className="w-full border-b border-white/10"/>
            <div className="p-5">
                <h1 className="text-2xl font-bold">Finished</h1>
                    <div>
                    {books.some(book => book.status === "FINISHED")  ? 
                        (<div className="flex gap-3 sm:gap-5 pt-5 pb-5 font-inter text-sm sm:text-[16px] overflow-x-auto">
                                {books.map((book) => (book.status === "FINISHED" &&
                                <Link key={book.externalId} to={`/book/edit/${book.externalId}/${book.id}`}>
                                    <Book
                                    cover={book.coverImage || placeHolder}
                                    title={book.title}
                                    show="hidden"
                                    showX="hidden"/>  
                                </Link>))} 
                                </div>) :
                        (<p className="opacity-80 font-light">You can also save books as finished ;D</p>)}
                    </div>
            </div>
        </div>
        )} 
        </main>
    </section>
  )
}

export default Home