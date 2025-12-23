import "@github/relative-time-element";
interface BookReviewProps{
    cover: string;
    title: string;
    review?: string;
    rate: number;
    datetime: string;
}

const BookReview: React.FC<BookReviewProps> = ({cover, title, review, rate, datetime}) => {
  return (
    <div className="flex shrink-0 text-center cursor-pointer">
                <div className="flex w-full justify-between">
                    <div className="flex gap-3">
                    <img src={cover} alt="book cover" className="w-20 h-30"/>
                      <div className="text-start justify-between flex flex-col">
                        <div>
                          <h2 className="text-lg">{title}</h2>
                          <p className="opacity-90">{review}</p>
                        </div>
                          <div className="opacity-60 text-sm">
                            <relative-time datetime={datetime}></relative-time>
                          </div>
                      </div>
                    </div>
                    <p className="purple-text justify-self-end">{rate}/10</p>
                </div>
        </div>
  )
}

export default BookReview