import { useParams } from "react-router-dom";
import addIcon from "../assets/icon/add.svg";
import closeIcon from "../assets/icon/close.svg";

const CollectionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { qnt } = useParams<{ qnt: string }>();

  function capitalizeFirstLetter(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

  return (
    <section className="h-screen w-full font-inter px-5 mx-auto text-white">
      <main className="w-[90vw] lg:w-[80vw] max-w-[1200px] rounded-2xl mx-auto md:mt-2 py-20 md:py-25">
        <div>
          <div className="flex flex-col text-center lg:text-start">
            <h1 className="text-xl font-bold">{id? capitalizeFirstLetter(id) : ""}</h1>
            <p className="opacity-65">{Number(qnt) > 1? qnt + " books" : qnt + " book"}</p>
          </div>
          <div className="flex gap-3 flex-wrap mt-5">
            <div className="relative">
              {/* <Book /> */}
              <div className="bg-dark border purple-border rounded-md absolute top-2 right-2 cursor-pointer">
                <img src={closeIcon} alt="close icon"/>
              </div>
            </div>
          </div>
          <button className="flex w-full justify-center border-white/20 border cursor-pointer rounded-md hover:border-[#b99ef6] transition-transform active:scale-95 sm:w-fit sm:h-fit items-center mt-5 xs:px-10 p-2">
            <div className="flex items-center gap-2">  
                <img src={addIcon} alt="add icon" className="h-min"/>
                <p>Add Book</p>
            </div>
          </button>
        </div>
      </main>
    </section>
  )
}

export default CollectionDetails