interface BookReviewProps{
    cover: string;
    title: string;
    review: string;
}

const BookReview: React.FC<BookReviewProps> = ({cover, title, review}) => {
  return (
    <div className="flex shrink-0 text-center cursor-pointer">
                <div className="flex gap-3">
                    <img src={cover} alt="book cover" className="w-20 h-30"/>
                    <div className="">
                        <h2 className="text-start text-lg">{title}</h2>
                        <p className=" text-start opacity-90">{review}</p>
                    </div>
                </div>
        </div>
  )
}

export default BookReview