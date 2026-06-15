import { useParams, useNavigate } from "react-router-dom";
import addIcon from "../assets/icon/add.svg";
import Loading from "../components/Loading";
import { getCollectionById, removeBookFromCollection, deleteCollection, updateCollectionName, getFavoriteBooks, toggleFavorite} from "../services/bookService";
import { useState, useEffect } from "react";
import Book from "../components/Book";
import Dropdown from "../components/Dropdown";
import AddCardBooks from "../components/AddCardBooks";
import placeHolder from "../assets/icon/placeholder.png";
import arrowBackIcon from "../assets/icon/arrow_back.svg";
import { useLocation } from "react-router-dom";

const CollectionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showX, setShowX] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [collection, setCollection] = useState<any>({});
  const [books, setBooks] = useState<any[]>([]); 
  const [favorites, setFavorites] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleRemove = async (bookId: any) => {
    try {
      setLoading(true);
      if (location.pathname.startsWith("/collection/favorites"))
      {
        await toggleFavorite(bookId, false);
        setShowX(false);
      } else {
        await removeBookFromCollection(bookId, id);
        setShowX(false);
      };
      alert("Book removed");
      window.location.reload();
    } catch (error) {
      console.error("Failed to remove book:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {

      setLoading(true);

      try{
          await deleteCollection(
          id
      );
      alert("Collection deleted");
      navigate('/profile');
      } catch (err) {
          console.error(err);
      }  finally {
          setLoading(false);
      }     
  };

  const handleEdit = async () => {

    setLoading(true);

    try{
        await updateCollectionName(
        name,
        id
    );
      alert("Collection name updated");
      window.location.reload();
    } catch (err: any) {
        console.error(err);
        if (err.response && err.response.data) {
          const backendMessage = err.response.data.message || "Invalid request.";
          alert(backendMessage);
        } else {
          alert("Something went wrong. Please try again later.");
        }
    }  finally {
        setLoading(false);
    }     
  };

  const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    };
  
  location.pathname.startsWith("/collection/favorites")?

   useEffect(() => {
      const loadFavoriteBooks = async () => {
        try {
          setLoading(true);
          const data = await getFavoriteBooks();
          setFavorites(data);
        } catch (error) {
          console.error("Failed to load favorite books", error);
        } finally {
          setLoading(false);
        }
      };
       loadFavoriteBooks();
    }, []) :

  useEffect(() => {
      const loadCollectionDetails = async () => {
        try {
          setLoading(true);
          const data = await getCollectionById(id);
          setCollection(data);
          setBooks(data.books);
        } catch (error) {
          console.error("Failed to load collections:", error);
        } finally {
          setLoading(false);
        }
      };
       loadCollectionDetails();
    }, []);

  function capitalizeFirstLetter(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

  const qnt = books.length;
  const qntFavorites = favorites.length;

  return (
    <section className="section-wrapper">
      <main className="main-wrapper md:py-25">
        {loading? <Loading/> :
          <div>

            <div className={`z-10 ${showEdit? 'font-inter p-5 text-white absolute z-8 top-30 h-full bg-white/0.1 backdrop-blur-xs w-full left-1/2 transform -translate-x-1/2' : 'hidden'}`}>
              <div className="absolute border border-white/20 p-6 rounded-xl bg-[#1a191b] left-1/2 -translate-x-1/2">
                <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text" 
                placeholder="Enter new collection name"
                className="p-3 rounded-md bg-white/10 focus:ring-1 focus:ring-[#b99ef6] outline-none"/>
              <div className="flex gap-2 pt-5 justify-end">
                <button onClick={handleEdit} className='h-min py-3 px-5 cursor-pointer text-[#1A1625] addButtonActived'>Save</button>
                <button onClick={() => {setShowEdit(!showEdit), setName("")}} className='h-min py-3 px-5 cursor-pointer addButton'>Cancel</button>
              </div>
              </div>
            </div>

            <div className="flex flex-col text-center">
              <div className="w-full flex mx-auto items-center justify-between">
                <img src={arrowBackIcon} alt="arrow back icon" className="cursor-pointer" onClick={() => navigate(-1)}/>
                <h1 className="text-xl font-bold">{location.pathname.startsWith("/collection/favorites")? "Favorites" : capitalizeFirstLetter(collection.name)}</h1>
                <div className={`${location.pathname.startsWith("/collection/favorites")? 'block' : 'hidden'}`}></div>
                <div className={`${location.pathname.startsWith("/collection/favorites")? 'hidden' : 'block'}`}>
                  <Dropdown 
                  onDelete={() => handleDelete()}
                  onEdit={() => {setShowEdit(!showEdit), setShowX(false)}}
                  onRemove={() => setShowX(!showX)}
                   />
                </div>
              </div>
              <p className="opacity-65">{location.pathname.startsWith("/collection/favorites")?
                Number(qntFavorites)? qntFavorites == 1? qntFavorites + " book" : qntFavorites + " books" : ":/"
                :
                Number(qnt)? qnt == 1? qnt + " book" : qnt + " books" : ":/"}</p>
            </div>
            <div className="flex gap-4 flex-wrap mt-5">
              { location.pathname.startsWith("/collection/favorites")?
              favorites.map((book) => (
                  <Book
                  key={book.externalId}
                  hoverTitle={book.title}
                  showHover="" 
                  remove={() => handleRemove(book.id)} 
                  cover={book.coverImage || placeHolder}
                  show="hidden"
                  goToBook={() => navigate(`/book/edit/${book.externalId}/${book.id}`)}
                  />
              )) :
                books.map((book) => (
                  <Book
                  key={book.externalId}
                  hoverTitle={book.title}
                  showHover="" 
                  remove={() => handleRemove(book.id)} 
                  cover={book.coverImage || placeHolder}
                  show="hidden"
                  showX={showX? "" : "hidden"}
                  goToBook={() => navigate(`/book/edit/${book.externalId}/${book.id}`)}
                  />
            ))}
            </div>
            <button disabled={showEdit} className={`flex w-full justify-center mx-auto border-white/20 border cursor-pointer rounded-md hover:border-[#b99ef6] transition-transform active:scale-95 sm:w-fit sm:h-fit items-center mt-5 xs:px-10 p-2 ${location.pathname.startsWith("/collection/favorites")? "hidden" : "flex"}`} onClick={() => {handleScrollTop(), setShowAddCard(true), setShowX(false)}}>
              <div className="flex items-center gap-2">  
                  <img src={addIcon} alt="add icon" className="h-min"/>
                  <p>Add Book</p>
              </div>
            </button>
              <AddCardBooks 
              onCancel={() => setShowAddCard(false)}
              collectionId={id}
              isOpen={showAddCard}
              savedBooks={location.pathname.startsWith("/collection/favorites") ? favorites : books}
              />
          </div>
        }
      </main>
    </section>
  )
}

export default CollectionDetails