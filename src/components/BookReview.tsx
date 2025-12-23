interface BookReviewProps{
    cover: string;
    title: string;
    review?: string;
    rate: number;
}

const BookReview: React.FC<BookReviewProps> = ({cover, title, review, rate}) => {
  return (
    <div className="flex shrink-0 text-center cursor-pointer">
                <div className="flex w-full justify-between">
                    <div className="flex gap-3">
                    <img src={cover} alt="book cover" className="w-20 h-30"/>
                      <div>
                          <h2 className="text-start text-lg">{title}</h2>
                          <p className=" text-start opacity-90">{review}</p>
                      </div>
                    </div>
                    <p className="purple-text justify-self-end">{rate}/10</p>
                </div>
        </div>
  )
}

export default BookReview