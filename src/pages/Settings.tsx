import '../checkbox.css';
import Genres from '../components/Genres';
import { genresData } from '../data/constants';
import { getPreferences, updatePreferences } from '../services/bookService';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import { deleteUser } from '../services/bookService';
import { useNavigate } from 'react-router-dom';
import { SettingsSk } from '../components/Skeleton';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Settings = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [loadingGoal, setLoadingGoal] = useState(false);
  const [goal, setGoal] = useState(false);
  const [number, setNumber] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);

  const { data: preferences, isLoading: loadingSettings } = useQuery({
    queryKey: ["preferences"],
    queryFn: getPreferences
  });

  useEffect(() => {
    if (preferences) {
      const dataUiSettings = preferences.uiSettings || {};
      setGoal(dataUiSettings.Goal === "Annual");
      setNumber(dataUiSettings.Number || 0);

      if (preferences.favoriteGenres) {
        setSelectedGenres(preferences.favoriteGenres);
      }
    }
  }, [preferences]);

  const handleGoal = async () => {
      setLoadingGoal(true);
      try{
          await updatePreferences(
          selectedGenres,
          goal === false? {Goal: 'Monthly', Number: number} : {Goal: "Annual", Number: number}
      );
      queryClient.invalidateQueries({ queryKey: ["preferences"] });
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
      queryClient.invalidateQueries({ queryKey: ["preferences"] });
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
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

  const handleDelete = async () => {

      setDeleting(true);

      try{
        await deleteUser();

        queryClient.clear();

        alert("Profile deleted");

        navigate('/login');
      } catch (err: any) {
        console.error(err);
        if (err.response && err.response.data) {
          const backendMessage = err.response.data.message || "Invalid request.";
          alert(backendMessage);
        } else {
          alert("Something went wrong. Please try again later.");
          }
      }  finally {
        setDeleting(false);
      }      
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
    localStorage.removeItem("recent_book_searches");
    queryClient.clear();
    navigate("/login", { replace: true });
  }

  return (
    <section  className='section-wrapper'>
        <main className='main-wrapper flex gap-3 flex-col'>
            <div className="border border-white/20 p-4 rounded-xl">
                <h1 className="text-xl font-bold text-start">Reading Goal</h1>
                {loadingSettings? <SettingsSk/> 
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
              {loadingSettings? <SettingsSk/> 
              
              :

              <div className='flex items-end'>
                <div>
                  <h2 className='mt-1'>Select your favorites genres to get better recommendations</h2>
                  <div className='flex flex-wrap gap-2 mt-3'>
                    {genresData.map((item) => (
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
            <div className="border border-white/20 p-4 rounded-xl mb-2">
                <h1 className="text-xl font-bold text-start">Account Management</h1>
                <div className='flex flex-col gap-2 text-sm md:w-fit mt-3'>
                  <Link to="/change-password" className='flex md:w-fit mb-2'>
                    <button className='rounded-xl bg-white/10 hover:bg-white/20 transition-transform active:scale-95 h-min py-3 px-9 font-bold cursor-pointer w-full'>Change password</button>
                  </Link>
                  <Alert
                  handleDelete={handleDelete}
                  loading={deleting}
                  buttonText='Delete account'
                  buttonAlert={(<span>Are you sure you want to delete your account? 
                    <br />All of your data will be permanently removed. 
                    <br />This action cannot be undone.</span>)}
                  />
                </div>
            </div>
              <Alert
                  handleSignout={handleLogout}
                  isSignOut={true}
                  buttonText='Log out'
                  buttonAlert='Are you sure you want to log out of your account?'
              />
        </main>
    </section>
  )
}

export default Settings