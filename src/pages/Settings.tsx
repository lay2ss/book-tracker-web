import '../checkbox.css';
import Genres from '../components/Genres';
import { Genresdata } from '../data/constants';

const Settings = () => {

  return (
    <section  className='h-screen w-full font-inter p-5 relative mx-auto text-white'>
        <main className='w-[90vw] lg:w-[80vw] max-w-[1200px] rounded-tl-2xl rounded-tr-2xl mx-auto bottom-0 left-1/2 transform -translate-x-1/2  h-screen absolute border-l-3 border-r-3 border-t-3 border-[#252033] p-5 flex gap-3 flex-col'>
            <div className="bg-dark-purple p-4 rounded-xl">
                <h1 className="text-xl font-bold purple-text text-start">Reading Goal</h1>
                <div className='flex flex-col'>
                  <div className='flex items-center'>
                    <p>Annual</p> 
                    <div className="checkbox-apple">
                        <input className="yep" id="check" type="checkbox"/>
                        <label htmlFor="check"></label>
                    </div>
                    <p>Monthly</p>
                  </div>
                  <div className='flex items-center justify-between gap-2 flex-wrap md:flex-nowrap'>
                    <input type="text" placeholder="Type a number" className='border border-gray-700 p-2 w-full md:w-1/3 rounded-md outline-none focus:ring-1 focus:ring-[#b99ef6] text-sm' />
                    <button className='rounded-xl text-[#252033] text-xs font-bold tracking-wider transition-transform active:scale-95 bg-[#b99ef6] h-min py-3 px-5 mt-2 md:mt-0 cursor-pointer'>Save</button>
                  </div>
                </div>
            </div>
            <div className="bg-dark-purple p-4 rounded-xl">
              <h1 className="text-xl font-bold purple-text text-start">Favorites Genres</h1>
              <h2 className='mt-1'>Select your favorites genres to get better recommendations</h2>
              <div className='flex flex-wrap gap-2 mt-3'>
                {Genresdata.map((item) => (
                  <div key={item.id}>
                    <Genres 
                      genre={item.genre}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-dark-purple p-4 rounded-xl">
                <h1 className="text-xl font-bold purple-text text-start">Account Management</h1>
                <div className='flex flex-col gap-2 text-sm md:w-fit mt-3'>
                  <button className='rounded-xl border-[#b99ef6] border transition-transform active:scale-95 h-min py-3 px-5 cursor-pointer'>Change password</button>
                  <button className='rounded-xl bg-red-500 transition-transform active:scale-95 h-min py-3 px-5 mt-2 cursor-pointer'>Delete account</button>
                  <p className='text-red-400 text-center md:text-start'>This action cannot be undone</p>
                </div>
            </div>
        </main>
    </section>
  )
}

export default Settings