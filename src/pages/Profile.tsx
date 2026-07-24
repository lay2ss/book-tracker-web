import StatWidget from "../components/StatWidget";
import GoalTracker from "../components/GoalTracker";
import BookReview from "../components/BookReview";
import Collection from "../components/Collection";
import addIcon from "../assets/icon/add.svg";
import bookIcon from "../assets/icon/book.svg";
import pageIcon from "../assets/icon/page.svg";
import booksIcon from "../assets/icon/books.svg";
import { Link } from "react-router-dom";
import { getBooks, getCollections, getPreferences } from "../services/bookService";
import { ProfileSk, ProfileSk2, ProfileSk3 } from "../components/Skeleton";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
const { data: books = [], isLoading: loadingBooks } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

const { data: collections = [], isLoading: loadingCollections } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });

const { data: preferences, isLoading: loadingSettings } = useQuery({
    queryKey: ["preferences"],
    queryFn: getPreferences,
  });

const recent = books.filter((book: any) => book.comment && book.comment.trim() !== "");
const favorites = books.filter((book: any) => book.isFavorite === true);

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();

const finished = books.filter((book: any) => book.status === "FINISHED");
const finishedThisYear = books.filter((book: any) => book.status === "FINISHED" && book.readYear === year);
const finishedThisMonth = books.filter((book: any) => book.status === "FINISHED" && book.readYear === year && book.readMonth === month + 1);

const totalPages = finished.reduce((sum: number, book: any) => sum + (book.totalPage || 0), 0);

const dataUiSettings = preferences?.uiSettings || {};
const isAnnualGoal = dataUiSettings.Goal === "Annual";
const goalNumber = dataUiSettings.Number || 0;

  return (
    <section className='section-wrapper'>
        <main className='main-wrapper'>
        <div className="flex flex-wrap md:flex-nowrap w-full justify-center gap-5 items-center">
          <div className="flex md:gap-2  flex-wrap gap-2 md:justify-center md:flex-nowrap lg:gap-4">
              <StatWidget 
              stat={loadingBooks? "..." : finishedThisYear.length}
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
              stat={loadingBooks? "..." : finished.length}
              text="Total books"
              icon={booksIcon}
              alt="books"
              />
          </div>
        </div>
        <div className="w-full border-b border-white/10 py-5"/>
        <div className="flex md:justify-between flex-wrap mt-5 justify-center gap-5">
          <div>
            <h1 className="text-2xl font-bold text-center md:text-start">Reading Goal</h1>
            <div className="flex mt-5 bg-white/5 rounded-xl p-3 justify-center md:w-fit">
            {loadingSettings? <ProfileSk3/> 
            
              :
    
              <GoalTracker 
                current={isAnnualGoal? finishedThisYear.length : finishedThisMonth.length} 
                max={goalNumber? goalNumber : 1} 
                label={isAnnualGoal? "Yearly Goal" : "Monthly Goal"}
              />
            }
            </div>
          </div>
          <div className="md:w-2/3 w-full text-center md:text-start">
            <h1 className="text-2xl font-bold">Personal notes</h1>
            <div>
              {loadingBooks? <div className="mt-5"><ProfileSk2/></div> : 
              (
                <div className="mt-5 bg-white/5 gap-4 flex flex-col p-3 rounded-xl max-h-100 overflow-y-auto">
                  {recent.length < 1? (<p className="opacity-50">you can add a personal note when saving a book</p>) :
                   recent.map((book: any) => (
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
              {loadingCollections? <div className="mt-5"><ProfileSk/></div> : (<div className="w-full mt-5 flex gap-4 flex-wrap justify-center md:justify-start">
                <Link to={'/collection/favorites'} className="w-full sm:w-50">
                  <Collection
                  name="Favorites"
                  qnt={favorites.length}
                  />
                </Link>
                  {collections.map((collection: any) => (
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