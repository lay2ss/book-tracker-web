import '../checkbox.css';
import Genres from '../components/Genres';
import { Genresdata } from '../data/constants';

const Settings = () => {

  return (
    <section  className='section-wrapper'>
        <main className='main-wrapper flex gap-3 flex-col'>
            <div className="border border-white/20 p-4 rounded-xl">
                <h1 className="text-xl font-bold text-start">Reading Goal</h1>
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
                    <input type="number" max={1000} min={0} className='border border-white/20 p-2 w-20 rounded-md outline-none focus:ring-1 focus:ring-[#b99ef6] text-sm' />
                    <button className='rounded-xl text-[#252033] text-xs font-bold tracking-wider transition-transform active:scale-95 bg-[#b99ef6] h-min py-3 px-5 mt-2 md:mt-0 cursor-pointer'>Save</button>
                  </div>
                </div>
            </div>
            <div className="border border-white/20 p-4 rounded-xl">
              <h1 className="text-xl font-bold text-start">Favorites Genres</h1>
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
            <div className="border border-white/20 p-4 rounded-xl">
                <h1 className="text-xl font-bold text-start">Account Management</h1>
                <div className='flex flex-col gap-2 text-sm md:w-fit mt-3'>
                  <a href="/change-password" className='flex md:w-fit'>
                    <button className='rounded-xl border-[#b99ef6] border transition-transform active:scale-95 h-min py-3 px-9 cursor-pointer w-full'>Change password</button>
                  </a>
                  <button className='rounded-xl bg-red-500 transition-transform active:scale-95 h-min py-3 px-5 mt-2 cursor-pointer'>Delete account</button>
                  <p className='text-red-400 text-center md:text-start'>This action cannot be undone</p>
                </div>
            </div>
        </main>
    </section>
  )
}

export default Settings