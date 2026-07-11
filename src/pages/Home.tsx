import Book from "../components/Book";
import BookCard from "../components/BookCard";
import searchIcon from "../assets/icon/search.svg";
import placeHolder from "../assets/icon/placeholder.png";
import { searchBooks, getBooks, getPreferences, getRecommendationsByGenres } from "../services/bookService";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HomeSk, HomeSk2, HomeSk3 } from "../components/Skeleton";
import { useQuery } from "@tanstack/react-query";
import empty_state from "../assets/icon/empty_state.svg";

const Home = () => {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>(() => {
        const saved = localStorage.getItem("recent_book_searches");
        return saved ? JSON.parse(saved) : [];
    });
    
    const { data: books = [], isLoading: loadingFeed } = useQuery({
        queryKey: ["books"],
        queryFn: getBooks,
    });
    
    const { data: recommendations = [], isLoading: loadingDashboard } = useQuery({
        queryKey: ["recommendations"],
        queryFn: async () => {

            const prefs = await getPreferences();
            const userGenres = prefs?.favoriteGenres;

            if (userGenres && userGenres.length > 0) {
                return await getRecommendationsByGenres(userGenres);
            } else {
                return await getRecommendationsByGenres(['Thriller', 'Suspense']);
            }
        },
    });

    const handleSearch = async () => {
        if (!query.trim()) return;
        setRecentSearches((prev) => {
            const filtered = prev.filter((item) => item !== query.trim());
            const updated = [query.trim(), ...filtered].slice(0, 5);
            localStorage.setItem("recent_book_searches", JSON.stringify(updated));
            return updated;
        });
        setLoading(true);
        setShowDropdown(false);
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

    const hasReadingBooks = books.some((book: any) => book.status === "READING");
    const hasFinishedBooks = books.some((book: any) => book.status === "FINISHED");

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
                            className="border-none py-2 px-3 rounded-md outline-none ring-1 ring-[#b99ef6]/70 w-full focus:ring-[#b99ef6]"/>
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
            </div>

        <div className="px-5">
            {loading? (<HomeSk3/>
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
        <div className="p-5">
            <h1 className="text-2xl pb-5 font-bold">Your next reading?</h1>
            {loadingDashboard? <HomeSk/> 

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
        {loadingFeed? <div className=""><HomeSk2/></div> : 
        (<div>
        {books.length == 0? (
            <div className="flex flex-col items-center justify-center">
                <img  className="w-60" src={empty_state} alt="empty state"/>
                <p className="text-lg opacity-50">No saved books</p>
            </div>) : 
            <>
            {hasReadingBooks ?
            <div className="p-5">
                <h1 className="text-2xl font-bold">Currently reading</h1>
                    <div>
                        <div className="flex gap-3 sm:gap-4 pt-5 overflow-x-auto pb-5 font-inter font-semibold text-sm sm:text-[16px]">
                            {books.map((book: any) => (book.status === "READING" &&
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
                        </div>
                    </div>                  
            </div> 
            :
            ("")
            }
        {hasFinishedBooks ? 
        <>        
        <div className="w-full border-b border-white/10"/>
            <div className="p-5">
                <h1 className="text-2xl font-bold">Finished</h1>
                    <div>
                        <div className="flex gap-3 sm:gap-5 pt-5 pb-5 font-inter text-sm sm:text-[16px] overflow-x-auto">
                                {books.map((book: any) => (book.status === "FINISHED" &&
                                <Link key={book.externalId} to={`/book/edit/${book.externalId}/${book.id}`}>
                                    <Book
                                    cover={book.coverImage || placeHolder}
                                    title={book.title}
                                    show="hidden"
                                    showX="hidden"/>  
                                </Link>))} 
                                </div>
                    </div>
            </div> 
            </>
            :
            ("")
            }
            </>}
        </div>
        )}

        </main>
    </section>
  )
}

export default Home