import CircularProgress from "./CircularProgress";
import closeIcon from "../assets/icon/close.svg";

interface BookProps{
    current?: number;
    total?: number;
    cover?: string;
    title?: string;
    hoverTitle?: string;
    showHover? : string;
    show?: string;
    showX?: string;
    remove?: any;
    isSelected?: boolean;
    onSelect?: (id: string) => void;
    id: string;
    select?: boolean;
}

const Book: React.FC<BookProps> = ({ id, current, total, cover, title, show, showX, remove, isSelected, hoverTitle, onSelect , showHover = "hidden", select }) =>{

  return (
        <div className={`relative ${isSelected && select? 'border-2 rounded-md purple-border' : ''}`} onClick={() => onSelect?.(id)}>
            <div className={`opacity-0 hover:opacity-85 absolute left-1/2 -translate-x-1/2 text-xs outline-white/10 rounded-md bg-[#1a191b] p-1 w-full h-full ${showHover}`}>
                <div className="flex items-center justify-center w-full h-full">
                    <p className="text-center">{hoverTitle}</p>
                </div>
            </div>
            <button onClick={remove} className={`flex shrink-0 text-center cursor-pointer ${showX}`}>
                <div className="bg-dark inset-ring-1 inset-ring-white/30 rounded-md absolute top-2 right-2 cursor-pointer hover:inset-ring-white/70">
                    <img src={closeIcon} alt="close icon"/>
                </div>
            </button>
            <div className="flex gap-3">
                <div className="shrink-0">
                    <img src={cover} alt="book cover" className="max-w-35 w-fit h-fit rounded-md"/>
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