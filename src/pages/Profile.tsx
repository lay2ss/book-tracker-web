import StatWidget from "../components/StatWidget";
import GoalTracker from "../components/GoalTracker";
import BookReview from "../components/BookReview";
import Collection from "../components/Collection";
import addIcon from "../assets/icon/add.svg";
import bookIcon from "../assets/icon/book.svg";
import pageIcon from "../assets/icon/page.svg";
import fireIcon from "../assets/icon/fire.svg";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { getBooks, getCollections } from "../services/bookService";
import Loading from "../components/Loading";
import Streak from "../components/Streak";

const Profile = () => {

  const [loadingBooks, setLoadingBooks] = useState(false);
  const [books, setBooks] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [recent, setRecent] = useState<any[]>([]);
  const [finished, setFinished] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoadingBooks(true);
        const data = await getBooks();
        const recentBooks = data.filter((book:any) => book.comment && book.comment.trim() !== "");
        const favoriteBooks = data.filter((book: any) => book.isFavorite === true);
        const now = new Date();
        const year = now.getFullYear;
        const booksFinished = data.filter((book:any) => book.status === "FINISHED" && book.readYear === year);
        const totalPagesFinished = data.filter((book: any) => book.status === "FINISHED")
        .reduce((sum: number, book:any) => sum + (book.totalPage || 0), 0);
        setFavorites(favoriteBooks);
        setRecent(recentBooks);
        setFinished(booksFinished);
        setTotalPages(totalPagesFinished);
        setBooks(data);
      } catch (error) {
        console.error("Failed to load books:", error);
      } finally {
        setLoadingBooks(false);
      }
    };

    loadBooks();
  }, []);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        setLoading(true);
        const data = await getCollections();
        setCollections(data);
      } catch (error) {
        console.error("Failed to load collections:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCollections();
  }, []);

  return (
    <section className='section-wrapper'>
        <main className='main-wrapper'>
        <div className="flex flex-wrap md:flex-nowrap w-full justify-center gap-5 items-center">
          <div className="flex md:gap-2  flex-wrap gap-2 md:justify-center md:flex-nowrap lg:gap-4">
            <StatWidget 
            stat={loadingBooks? "..." : finished.length}
            text="Read this year"
            icon={bookIcon}
            alt="book"
            />
            <StatWidget 
            stat={loadingBooks? "..." : totalPages}
            text="Total pages"
            icon={pageIcon}
            alt="page"
            />
            <StatWidget 
            stat={loadingBooks? "..." : <Streak books={books} />}
            text="Reading streak"
            icon={fireIcon}
            alt="fire"
            />
          </div>
        </div>
        <div className="w-full border-b border-white/10 py-5"/>
        <div className="flex md:justify-between flex-wrap mt-5 justify-center gap-5">
          <div>
            <h1 className="text-2xl font-bold text-center md:text-start">Reading Goal</h1>
            <div className="flex mt-5 border-white/20 border rounded-xl p-3 justify-center md:w-fit">
              <GoalTracker 
                current={34} 
                max={50} 
              />
            </div>
          </div>
          <div className="md:w-2/3 w-full text-center md:text-start">
            <h1 className="text-2xl font-bold">Recent Activity</h1>
            <div>
              {loadingBooks? <div className="mt-5"><Loading/></div> : 
              (
                <div className="mt-5 bg-dark-purple gap-4 flex flex-col p-3 rounded-xl max-h-100 overflow-y-auto">
                  {recent.map((book) => (
                    <Link key={book.externalId} to={`/book/edit/${book.externalId}/${book.id}`}>
                      <BookReview
                      cover={book.coverImage || "src/assets/icon/placeholder.png"}
                      review={book.comment || ""} 
                      rate={book.rating}
                      datetime={book.updatedAt}
                      />
                    </Link>
                  ))}
                </div>
                )}
            </div>
          </div>
          <div className="w-full border-b border-white/10 pt-5"/>
          <div className="w-full text-center md:text-start">
            <h1 className="text-2xl font-bold">My Collections</h1>
            <div>
              {loading? <div className="mt-5"><Loading/></div> : (<div className="w-full mt-5 flex gap-4 flex-wrap justify-center md:justify-start">
                <Link to={'/collection/favorites'} className="w-full sm:w-50">
                  <Collection
                  name="Favorites"
                  qnt={favorites.length}
                  />
                </Link>
                  {collections.map((collection) => (
                    <Link className="w-full sm:w-50" key={collection.id} to={`/collection/${collection.id}`}>
                        <Collection
                        name={collection.name}
                        qnt={collection._count.books}/>  
                    </Link>))}

                <div className="flex items-center w-full sm:w-fit justify-center">
                  <Link to={`/collection/create`} className="w-full">
                    <button className="flex w-full justify-center border-white/20 border cursor-pointer rounded-md hover:border-[#b99ef6] transition-transform active:scale-95 sm:w-fit sm:h-fit items-center">
                      <img src={addIcon} alt="add icon" className="h-min p-2"/>
                    </button>
                  </Link>
                </div>
                  </div>)}
            </div>
          </div>
        </div>
        </main>
    </section>
  )
}

export default Profile