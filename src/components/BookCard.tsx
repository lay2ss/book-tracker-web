import { useState } from "react";
interface BookCardProps{
    description?: string;
    cover: string;
    title: string;
    authorName?: string;
    year: number;
    rate: number;
}

const BookCard: React.FC<BookCardProps> = ({ description, cover, title, authorName, year, rate }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const toggleState = () => setIsFavorite(!isFavorite);

  return (
    <div className='flex font-inter bg-dark-purple rounded-2xl w-fit p-5 flex-col max-w-[450px] shrink-0 input-shadow'>
        <div className="flex gap-5 overflow-auto">
            <div className="relative flex">
                <img src={cover} alt="cover" className="cursor-pointer"/>
                <div className="purple-bg absolute bottom-1 left-1 rounded-xl w-fit py-1 px-2 text-sm tracking-wider">
                    <p>{rate}/10</p>
                </div>
            </div>
            <div className="flex flex-col justify-between max-w-[165px]">
                <div className="text-start">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <p>{description}</p>
                </div>
                <div className="border-[#b99ef6] border rounded-xl w-fit py-1 px-2 text-sm">
                    <p>
                        {authorName}
                    </p>
                </div>
            </div>
        </div>
        <div className="flex justify-between mt-2">
            <p className="text-sm">Read in {year}</p>
            <button className="transition-transform active:scale-80 cursor-pointer" onClick={toggleState}>
                <img src={isFavorite? "src/assets/icon/star_active.svg" : "src/assets/icon/star.svg"} alt="star-icon"/>
            </button>
        </div>
    </div>
  )
}

export default BookCard