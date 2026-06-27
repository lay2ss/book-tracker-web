import { useParams, useNavigate } from "react-router-dom";
import addIcon from "../assets/icon/add.svg";
import { getCollectionById, removeBookFromCollection, deleteCollection, updateCollectionName, getFavoriteBooks, toggleFavorite} from "../services/bookService";
import { useState } from "react";
import Book from "../components/Book";
import Dropdown from "../components/Dropdown";
import AddCardBooks from "../components/AddCardBooks";
import placeHolder from "../assets/icon/placeholder.png";
import arrowBackIcon from "../assets/icon/arrow_back.svg";
import { useLocation } from "react-router-dom";
import { CollectionsSk, CollectionsSk2 } from "../components/Skeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../components/Loading";

const CollectionDetails = () => {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const [name, setName] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showX, setShowX] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const navigate = useNavigate();

  const isFavoritesPage = location.pathname.startsWith("/collection/favorites");
  const { data: favorites = [], isLoading: loadingFavorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavoriteBooks,
    enabled: isFavoritesPage, 
  });

  const { data: collectionDetails, isLoading: loadingCollection } = useQuery({
    queryKey: ["collection", id],
    queryFn: () => getCollectionById(id!),
    enabled: !isFavoritesPage && !!id,
  });

  const collection = collectionDetails || {};
  const books = collectionDetails?.books || [];
  const loading = isFavoritesPage ? loadingFavorites : loadingCollection;
  
  const qnt = books.length;
  const qntFavorites = favorites.length;

  const handleRemove = async (bookId: any) => {
    try {
      setLoadingAction(true);
      if (isFavoritesPage)
      {
        await toggleFavorite(bookId, false);
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      } else {
        await removeBookFromCollection(bookId, id);
        queryClient.invalidateQueries({ queryKey: ["collection", id] });
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      };
      setShowX(false);
      alert("Book removed");
    } catch (error) {
      console.error("Failed to remove book:", error);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async () => {

      setLoadingAction(true);

      try{
          await deleteCollection(
          id
      );
      queryClient.removeQueries({ queryKey: ["collection", id] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      alert("Collection deleted");
      navigate('/profile');
      } catch (err) {
          console.error(err);
      }  finally {
          setLoadingAction(false);
      }     
  };

  const handleEdit = async () => {
    setLoadingEdit(true)
    try{
        await updateCollectionName(
        name,
        id
    );
      queryClient.invalidateQueries({ queryKey: ["collection", id] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setShowEdit(false);
      setName("");
      alert("Collection name updated");
    } catch (err: any) {
        console.error(err);
        if (err.response && err.response.data) {
          const backendMessage = err.response.data.message || "Invalid request.";
          alert(backendMessage);
        } else {
          alert("Something went wrong. Please try again later.");
        }
    } finally {
      setLoadingEdit(false)
    }     
  };

  const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    };

  function capitalizeFirstLetter(text: string): string {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return (
    <section className="section-wrapper">
      <main className="main-wrapper md:py-25">
        {loading? <CollectionsSk/> :
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
                <button onClick={handleEdit} disabled={loadingEdit} className='h-min py-3 px-5 cursor-pointer text-[#1A1625] addButtonActived'>{loadingEdit? <Loading/> : "Save"}</button>
                <button onClick={() => {setShowEdit(!showEdit), setName("")}} className='h-min py-3 px-5 cursor-pointer addButton'>Cancel</button>
              </div>
              </div>
            </div>

            <div className="flex flex-col text-center">
              <div className="w-full flex mx-auto items-center justify-between">
                <img src={arrowBackIcon} alt="arrow back icon" className="cursor-pointer" onClick={() => navigate(-1)}/>
                <h1 className="text-xl font-bold">{isFavoritesPage? "Favorites" : capitalizeFirstLetter(collection.name)}</h1>
                <div className={`${isFavoritesPage? 'block' : 'hidden'}`}></div>
                <div className={`${isFavoritesPage? 'hidden' : 'block'}`}>
                  <Dropdown 
                  onDelete={() => handleDelete()}
                  onEdit={() => {setShowEdit(!showEdit), setShowX(false)}}
                  onRemove={() => setShowX(!showX)}
                   />
                </div>
              </div>
              <p className="opacity-65">{isFavoritesPage?
                Number(qntFavorites)? qntFavorites == 1? qntFavorites + " book" : qntFavorites + " books" : ":/"
                :
                Number(qnt)? qnt == 1? qnt + " book" : qnt + " books" : ":/"}</p>
            </div>
            <div className="flex gap-4 flex-wrap mt-5 justify-center">
              {!loadingAction? isFavoritesPage?
              favorites.map((book: any) => (
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
                books.map((book: any) => (
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
            )) : <CollectionsSk2/>}
            </div>
            <button disabled={showEdit} className={`flex w-full justify-center mx-auto border-white/20 border cursor-pointer rounded-md hover:border-[#b99ef6] transition-transform active:scale-95 sm:w-fit sm:h-fit items-center mt-5 xs:px-10 p-2 ${isFavoritesPage? "hidden" : "flex"}`} onClick={() => {handleScrollTop(), setShowAddCard(true), setShowX(false)}}>
              <div className="flex items-center gap-2">  
                  <img src={addIcon} alt="add icon" className="h-min"/>
                  <p>Add Book</p>
              </div>
            </button>
              <AddCardBooks 
              onCancel={() => setShowAddCard(false)}
              collectionId={id}
              isOpen={showAddCard}
              savedBooks={isFavoritesPage ? favorites : books}
              />
          </div>
        }
      </main>
    </section>
  )
}

export default CollectionDetails