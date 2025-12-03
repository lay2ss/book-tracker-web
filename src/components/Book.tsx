import CircularProgress from "./CircularProgress";

interface BookProps{
    current: number;
    total: number;
    bookCover: string;
    bookTitle: string;
}

const Book: React.FC<BookProps> = ({ current, total, bookCover, bookTitle }) =>{
  return (
        <div className="flex shrink-0 text-center">
            <div className="flex gap-2">
                <div>
                    <img src={bookCover} alt="book cover" className="w-23 h-35 sm:w-fit sm:h-fit"/>
                    <h2 className="max-w-[90px] sm:max-w-[130px] pt-2">{bookTitle}</h2>
                </div>
                <div className="flex flex-col justify-center">
                    <CircularProgress currentPage={current} totalPages={total} />
                </div>
            </div>
        </div>
  )
}

export default Book