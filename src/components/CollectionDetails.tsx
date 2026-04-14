import { useParams } from "react-router-dom";
import addIcon from "../assets/icon/add.svg";
import editIcon from "../assets/icon/edit.svg";
import Loading from "./Loading";
import { getCollectionById } from "../services/bookService";
import { useState, useEffect } from "react";
import Book from "./Book";

const CollectionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [collection, setCollection] = useState<any>({});
  const [books, setBooks] = useState<any[]>([]); 

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

  return (
    <section className="section-wrapper">
      <main className="main-wrapper md:py-25">
        {loading? <Loading/> :
          <div>
            <div className="flex flex-col text-center">
              <div className="flex mx-auto gap-3 items-center">
                <h1 className="text-xl font-bold">{collection? capitalizeFirstLetter(collection.name) : ""}</h1>
                <img className="h-5 cursor-pointer" src={editIcon} alt="edit icon" />
              </div>
              <p className="opacity-65">{Number(qnt) >= 1? qnt + " books" : "no books added yet"}</p>
            </div>
            <div className="flex gap-5 flex-wrap mt-5">
              {books.map((book) => (<Book key={book.id} title={book.title} cover={book.coverImage} show="hidden"/>))}
            </div>
            <button className="flex w-full justify-center mx-auto border-white/20 border cursor-pointer rounded-md hover:border-[#b99ef6] transition-transform active:scale-95 sm:w-fit sm:h-fit items-center mt-5 xs:px-10 p-2">
              <div className="flex items-center gap-2">  
                  <img src={addIcon} alt="add icon" className="h-min"/>
                  <p>Add Book</p>
              </div>
            </button>
          </div>
        }
      </main>
    </section>
  )
}

export default CollectionDetails