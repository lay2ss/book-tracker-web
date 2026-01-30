import StatWidget from "../components/StatWidget";
import GoalTracker from "../components/GoalTracker";
import BookReview from "../components/BookReview";
import Collection from "../components/Collection";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <section className='h-screen w-full font-inter p-5 mx-auto text-white'>
        <main className='w-[90vw] lg:w-[80vw] max-w-[1200px] rounded-2xl mx-auto md:mt-2 py-20'>
        <div className="flex flex-wrap md:flex-nowrap w-full justify-center gap-5 items-center">
          {/* <div className="relative flex shrink-0">
            <img src="src/assets/icon/placeholder_profile2.png" alt="profile picture" className="w-min h-min"/>
            <button className="bg-black border-2 border-[#252033] w-6 h-6 rounded-full absolute top-10 left-9 cursor pointer p-0.5 cursor-pointer">
              <img src="src/assets/icon/edit.svg" alt="pencil icon"/>
            </button>
          </div> */}
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
        <div className="w-full border-b border-white/10 py-5"/>
        <div className="flex md:justify-between flex-wrap mt-5 justify-center gap-5">
          <div>
            <h1 className="text-2xl font-bold text-center md:text-start">Reading Goal</h1>
            <div className="flex mt-5 border-white/20 border rounded-xl p-3 justify-center md:w-fit">
              <GoalTracker 
                current={34} 
                max={50} 
              />
            </div>
          </div>
          <div className="md:w-2/3 w-full text-center md:text-start">
            <h1 className="text-2xl font-bold">Recent Activity</h1>
            <div className="mt-5 bg-dark-purple gap-4 flex flex-col p-3 rounded-xl">
              <BookReview
              cover="src/assets/icon/placeholder.png"
              review="" 
              rate={5}
              datetime="2025-12-23T01:06:16.000Z"
              />
            </div>
          </div>
          <div className="w-full border-b border-white/10 pt-5"/>
          <div className="w-full text-center md:text-start">
            <h1 className="text-2xl font-bold">My Collections</h1>
            <div className="mt-5 flex gap-4 flex-wrap justify-center md:justify-start">
              <Collection
                name="Favorites"
                qnt={23}
              />
              <div className="flex items-center w-full sm:w-fit justify-center">
                <Link to={`/collection/create`} className="w-full">
                  <button className="flex w-full justify-center border-white/20 border cursor-pointer rounded-md hover:border-[#b99ef6] transition-transform active:scale-95 sm:w-fit sm:h-fit items-center">
                    <img src="src/assets/icon/add.svg" alt="add icon" className="h-min p-2"/>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </main>
    </section>
  )
}

export default Profile