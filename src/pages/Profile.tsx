import StatWidget from "../components/StatWidget";
import GoalTracker from "../components/GoalTracker";
import BookReview from "../components/BookReview";

const Profile = () => {
  return (
    <section className='h-screen w-full font-inter p-5 relative mx-auto text-white'>
        <main className='w-[90vw] lg:w-[80vw] max-w-[1200px] rounded-tl-2xl rounded-tr-2xl mx-auto bottom-0 left-1/2 transform -translate-x-1/2  h-screen absolute border-l-3 border-r-3 border-t-3 border-[#252033] p-5'>
        <div className="flex flex-wrap md:flex-nowrap w-full justify-center gap-5 items-center">
          <img src="src/assets/icon/placeholder_profile2.png" alt="profile picture" className="w-min h-min cursor-pointer"/>
          <div className="flex md:gap-2  flex-wrap gap-2 md:justify-center md:flex-nowrap lg:gap-4">
            <StatWidget 
            stat={34}
            text="Read this year"
            icon="src/assets/icon/book.svg"
            alt="book"
            />
            <StatWidget 
            stat={5678}
            text="Total pages"
            icon="src/assets/icon/page.svg"
            alt="page"
            />
            <StatWidget 
            stat={56}
            text="Reading streak"
            icon="src/assets/icon/fire.svg"
            alt="fire"
            />
          </div>
        </div>
        <div className="flex md:justify-between flex-wrap mt-5 justify-center gap-5">
          <div className="">
            <h1 className="text-2xl font-bold purple-text text-center md:text-start">Reading Goal</h1>
            <div className="flex mt-5 border-[#252033] border-2 rounded-xl p-3 justify-center md:w-fit">
              <GoalTracker 
                current={34} 
                max={50} 
              />
            </div>
          </div>
          <div className="md:w-2/3 w-full text-center md:text-start">
            <h1 className="text-2xl font-bold purple-text">Recent Activity</h1>
            <div className="mt-5 bg-dark-purple gap-4 flex flex-col p-3 rounded-xl">
              <BookReview
              cover="src/assets/icon/placeholder.png"
              title="Book title"
              review="Book review Lorem ipsum dolor sit amet consectetur adipisicing elit."
              />
            </div>
          </div>
        </div>
        </main>
    </section>
  )
}

export default Profile