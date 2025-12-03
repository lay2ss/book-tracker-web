import { useState } from "react";

const BookCard = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const toggleState = () => setIsFavorite(!isFavorite);

  return (
    <div className='flex font-inter bg-light-orange rounded-2xl w-fit p-5 gray-text flex-col max-w-[450px]'>
        <div className="flex gap-5 overflow-auto">
            <div className="relative flex">
                <img src="src/assets/icon/placeholder.png" alt=""/>
                <div className="orange-bg absolute bottom-1 left-1 rounded-xl text-white w-fit py-1 px-2 text-sm tracking-wider">
                    <p>[10/10]</p>
                </div>
            </div>
            <div className="flex flex-col justify-between w-[350px]">
                <div>
                    <h2 className="text-xl font-bold">[Book Title]</h2>
                    <p>[Book Description Lorem ipsum dolor sit amet consectetur adipisicing elit.]</p>
                </div>
                <div className="bg-white rounded-xl w-fit py-1 px-2 text-sm">
                    <p>
                        [Author name]
                    </p>
                </div>
            </div>
        </div>
        <div className="flex justify-between mt-2">
            <p className="text-sm">Read in [year]</p>
            <button className="transition-transform active:scale-80" onClick={toggleState}>
                <img src={isFavorite? "src/assets/icon/star_active.svg" : "src/assets/icon/star.svg"} alt="star-icon"/>
            </button>
        </div>
    </div>
  )
}

export default BookCard