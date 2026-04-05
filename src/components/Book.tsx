import CircularProgress from "./CircularProgress";

interface BookProps{
    current?: number;
    total?: number;
    cover?: string;
    title: string;
    show?: string;
}

const Book: React.FC<BookProps> = ({ current, total, cover, title, show }) =>{
  return (
        <div className="flex shrink-0 text-center cursor-pointer">
            <div className="flex gap-2">
                <div>
                    <img src={cover} alt="book cover" className="w-23 h-35 sm:w-fit sm:h-fit"/>
                    <h2 className="max-w-22.5 sm:max-w-32.5 pt-2">{title}</h2>
                </div>
                <div className={`flex flex-col justify-center ${show}`}>
                    <CircularProgress currentPage={current} totalPages={total} />
                </div>
            </div>
        </div>
  )
}

export default Book