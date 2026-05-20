import '../checkbox.css';
import Genres from '../components/Genres';
import { Genresdata } from '../data/constants';
import { getPreferences, updatePreferences } from '../services/bookService';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

const Settings = () => {
  
  const [loading, setLoading] = useState(false);
  const [loadingGoal, setLoadingGoal] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [goal, setGoal] = useState(false);
  const [number, setNumber] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        setLoadingSettings(true);
        const data = await getPreferences();
        const dataUiSettings = data.uiSettings
        dataUiSettings.Goal === "Annual"? setGoal(true) : setGoal(false);
        setNumber(dataUiSettings.Number || 0);

        if (data.favoriteGenres) {
        setSelectedGenres(data.favoriteGenres);
        }

      } catch (error) {
        console.error("Failed to load preferences:", error);
      } finally {
        setLoadingSettings(false);
      }
    };
  
    loadPreferences();
  }, []);

  const handleGoal = async () => {
      setLoadingGoal(true);
      try{
          await updatePreferences(
          selectedGenres,
          goal === false? {Goal: 'Monthly', Number: number} : {Goal: "Annual", Number: number}
      );
      alert("Goal set");
      } catch (err) {
          console.error(err);
      }  finally {
          setLoadingGoal(false);
      }     
  };

  const handleGenres = async () => {
      setLoading(true);
      try{
          await updatePreferences(
          selectedGenres,
          goal === false? {Goal: 'Monthly', Number: number} : {Goal: "Annual", Number: number}
      );
      alert("Favorite genres updated");
      } catch (err) {
          console.error(err);
      }  finally {
          setLoading(false);
      }     
  };

  const handleGenreSelect = (genreName: string) => {
  setSelectedGenres((prev) =>
    prev.includes(genreName)
      ? prev.filter((g) => g !== genreName) 
      : [...prev, genreName]               
    );
  };

  return (
    <section  className='section-wrapper'>
        <main className='main-wrapper flex gap-3 flex-col'>
            <div className="border border-white/20 p-4 rounded-xl">
                <h1 className="text-xl font-bold text-start">Reading Goal</h1>
                {loadingSettings? <Loading/> 
                :
                (
                <div className='flex flex-col'>
                  <div className='flex items-center'>
                    <p>Monthly</p> 
                    <div className="checkbox-apple">
                        <input 
                        className="yep" 
                        id="check" 
                        type="checkbox" 
                        checked={goal}
                        onChange={() => setGoal(!goal)}
                        />
                        <label htmlFor="check"></label>
                    </div>
                    <p>Annual</p>
                  </div>
                  <div className='flex items-center justify-between gap-2 flex-wrap md:flex-nowrap'>
                    <input 
                    type="number" 
                    max={1000}  
                    min={0} 
                    name="pageNumber"
                    value={number}
                    onChange={(e) => setNumber(e.target.value === '' ? 0 : Number(e.target.value))}
                    className='border border-white/20 p-2 w-20 rounded-md outline-none focus:ring-1 focus:ring-[#b99ef6] text-sm' />
                    <button disabled={loadingGoal} onClick={handleGoal} className='rounded-xl text-[#252033] text-xs font-bold tracking-wider transition-transform active:scale-95 bg-[#b99ef6] h-min py-3 px-5 mt-2 md:mt-0 cursor-pointer'>{loadingGoal? <Loading/> : "Save"}</button>
                  </div>
                </div>
                )
                }
            </div>
            <div className="border border-white/20 p-4 rounded-xl">
              <h1 className="text-xl font-bold text-start">Favorites Genres</h1>
              {loadingSettings? <Loading/> 
              
              :

              <div className='flex items-end'>
                <div>
                  <h2 className='mt-1'>Select your favorites genres to get better recommendations</h2>
                  <div className='flex flex-wrap gap-2 mt-3'>
                    {Genresdata.map((item) => (
                      <div key={item.id}>
                        <Genres 
                          genre={item.genre}
                          isSelected={selectedGenres.includes(item.genre)}
                          onClick={() => handleGenreSelect(item.genre)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button disabled={loading} onClick={handleGenres} className='rounded-xl text-[#252033] text-xs font-bold tracking-wider transition-transform active:scale-95 bg-[#b99ef6] h-min py-3 px-5 mt-2 md:mt-0 cursor-pointer'>{loading? <Loading/> : "Save"}</button>
              </div>
              }
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