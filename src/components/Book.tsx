import CircularProgress from "./CircularProgress";
import closeIcon from "../assets/icon/close.svg";

interface BookProps{
    current?: number;
    total?: number;
    cover?: string;
    title: string;
    show?: string;
    showX?: string;
}

const Book: React.FC<BookProps> = ({ current, total, cover, title, show, showX }) =>{
  return (
        <div className="relative">
            <div className={`flex shrink-0 text-center cursor-pointer ${showX}`}>
                <div className="bg-dark border purple-border rounded-md absolute top-2 right-2 cursor-pointer">
                    <img src={closeIcon} alt="close icon"/>
                </div>
            </div>
            <div className="flex gap-3">
                <div className="shrink-0">
                    <img src={cover} alt="book cover" className="max-w-35 w-fit h-fit"/>
                    <h2 className="max-w-22.5 sm:max-w-32.5 pt-2 mx-auto text-center">{title}</h2>
                </div>
                <div className={`flex flex-col justify-center ${show}`}>
                    <CircularProgress currentPage={current} totalPages={total} />
                </div>
            </div>
        </div>
  )
}

export default Book