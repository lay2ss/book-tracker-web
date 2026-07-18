import "@github/relative-time-element";
interface BookReviewProps{
    cover: string;
    review?: string;
    rate?: number;
    datetime: string;
}

const BookReview: React.FC<BookReviewProps> = ({cover, review = "-", rate = 0, datetime}) => {
  return (
    <div className="flex shrink-0 text-center cursor-pointer w-full">
                <div className="flex w-full justify-between">
                    <div className="flex gap-3">
                    <img src={cover} alt="book cover" className="w-20 h-30"/>
                      <div className="text-start justify-between flex flex-col">
                        <div className="flex flex-col gap-1">
                          <div className="flex gap-1 items-center h-min opacity-65">
                            {Array.from({ length: rate }).map((_, i) => (
                              <div className="h-min" key={i}>
                              <label htmlFor="hs-ratings-readonly-1" className="text-[#b99ef6] pointer-events-none">
                                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                              </label>
                            </div>
                            ))}
                          </div>
                          <p className="opacity-90">{review}</p>
                        </div>
                          <div className="opacity-65 text-sm">
                            {/* @ts-expect-error - github relative-time custom element */}
                            <relative-time datetime={datetime}></relative-time>
                        </div>
                      </div>
                    </div>
                </div>
        </div>
  )
}

export default BookReview