import { useState } from 'react';
import logoname from "../assets/logo/logo_name.svg";
import b_purple_logo from "../assets/logo/b_purple_logo.svg";
import visibility_off from "../assets/icon/visibility_off.svg";
import visibility from "../assets/icon/visibility.svg";
import { useAuth } from '../contexts/AuthContext';

const Login = () => {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { login: authLogin } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  const endpoint = isSignUp ? '/register' : '/login';
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/users${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      authLogin(data); 
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleMode = () => setIsSignUp(!isSignUp);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <section className='flex h-screen w-full justify-center flex-col font-inter overflow-hidden text-white relative'>

    <div className='flex mx-auto items-center pb-5 gap-2'>
      <img src={b_purple_logo} alt="logo name" className='w-13'/>
      <img src={logoname} alt="logo name" className='w-23' />
    </div> 

      {/* mobile */}
      <div className='md:hidden mx-auto'>
        <main className='bg-dark-purple  w-[90vw] md:w-[70vw] rounded-2xl h-min gray-shadow mx-auto'>
          
          {/* mobile sign up form */}
          <div className={`p-10 ${isSignUp ? 'block' : 'hidden'}`}>
            <h2 className='inter-bold text-3xl text-center pt-10 pb-5'>Create Account</h2>
            <input type="text"
            name='name' 
            placeholder="Name" 
            className="input-style"
            value={formData.name}
            onChange={handleChange}
             />
            <input type="email" 
            name='email'
            placeholder="Email" 
            className="input-style"
            value={formData.email}
            onChange={handleChange} />
            <div className="relative w-full">
                <input type={showPassword ? 'text' : 'password'}
                name='password' 
                placeholder="Password" 
                className="input-style"
                onChange={handleChange}
                value={formData.password}/>
                <button type="button" 
                onClick={togglePassword} 
                className="right-3 top-5 icon-style">
                  <img src={showPassword ? visibility_off : visibility} alt="view" className="w-5" />
                </button>
            </div>
            <button className='button-style mx-auto flex mt-8 cursor-pointer text-[#252033]' onClick={handleSubmit} disabled={loading}>{loading? 
            (<div className="flex justify-center items-center w-full"> 
              <div className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
              </div> 
            </div>) 
              : 
            (<p>Sign up</p>)}
            </button>
            <div className='inter-semibold text-center mt-10 pb-10 opacity-70'>
              <p>Already have an account?
                <button className='button-style-underline' onClick={toggleMode}>Sign in</button>
              </p>
            </div>
          </div>

          {/* mobile sign in form */}
          <div className={`p-10 ${!isSignUp ? 'block' : 'hidden'}`}>
            <h2 className='inter-bold text-3xl text-center pt-10 pb-5 cursor-pointer'>Sign In</h2>
            <input type="email" placeholder="Email" className="input-style" />
            <div className="relative w-full">
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="input-style" />
                <button type="button" onClick={togglePassword} className="right-3 top-5 icon-style">
                  <img src={showPassword ? visibility_off : visibility} alt="view" className="w-5" />
                </button>
            </div>
            <button className='button-style mx-auto flex mt-8 cursor-pointer text-[#252033]'>Sign in</button>
            <a href='/forgot-password' className='cursor-pointer inter-semibold opacity-70 mx-auto flex mt-3 hover:underline w-fit'>Forgot your password?</a>
            <div className='inter-semibold text-center mt-10 pb-10 opacity-70'>
              <p>Don’t have an account?
                <button className='button-style-underline' onClick={toggleMode}>Sign up</button>
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* desktop */}
      <div className='hidden md:block w-200 max-w-full min-h-125 rounded-[20px] shadow-2xl relative overflow-hidden mx-auto bg-dark-purple'>
        
        {/* desktop sign up form */}
        <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 flex items-center justify-center flex-col px-10 
          ${isSignUp ? 'translate-x-full opacity-100 z-50' : 'opacity-0 z-0'}`}>
            
            <form className="form-style">
              <h1 className="font-bold text-3xl mb-4">Create Account</h1>
              <input type="text" placeholder="Name" className="input-style" />
              <input type="email" placeholder="Email" className="input-style" />
              <div className="relative w-full">
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="input-style" />
                <button type="button" onClick={togglePassword} className="right-3 top-5 icon-style">
                  <img src={showPassword ? visibility_off : visibility} alt="view" className="w-5" />
                </button>
              </div>
              <button type='button' className="button-style mt-3 cursor-pointer text-[#252033]">
                Sign Up
              </button>
            </form>
        </div>

        {/* desktop sign in form */}
        <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-20 flex items-center justify-center flex-col px-10
          ${isSignUp ? 'translate-x-full opacity-0' : 'opacity-100'}`}>
            
            <form className="form-style">
              <h1 className="font-bold text-3xl mb-4 gray-text">Sign In</h1>
              <input type="email" placeholder="Email" className="input-style" />
              <div className="relative w-full">
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="input-style" />
                <button type="button" onClick={togglePassword} className="right-3 top-5 icon-style">
                  <img src={showPassword ? visibility_off : visibility} alt="view" className="w-5" />
                </button>
              </div>
              <a href="/forgot-password" className="text-sm my-4 hover:underline">Forgot your password?</a>
              <button  type='button' className="button-style mt-3 cursor-pointer text-[#252033]">
                Sign In
              </button>
            </form>
        </div>

        {/* overlay container */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-50
          ${isSignUp ? '-translate-x-full' : ''}`}>
          
          <div className={`text-white relative -left-full h-full w-[200%] transform transition-transform duration-600 ease-in-out
            ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'}`}
            style={{ background: 'linear-gradient(to right, #4e1c80, #1A1625)' }}>
            
            {/* left panel (sign up) */}
            <div className={`absolute flex flex-col items-center justify-center h-full w-1/2 px-8 text-center top-0 transform transition-transform duration-600 ease-in-out
              ${isSignUp ? 'translate-x-0' : '-translate-x-[20%]'}`}>
              <h1 className="font-bold text-3xl mb-2">Welcome Back!</h1>
              <p className="text-sm font-light mb-8">To keep connected with us please login with your personal info</p>
              <button className="button-style-outline border-white" onClick={toggleMode}>
                Sign In
              </button>
            </div>

            {/* right panel (sign in) */}
            <div className={`absolute right-0 flex flex-col items-center justify-center h-full w-1/2 px-8 text-center top-0 transform transition-transform duration-600 ease-in-out
              ${isSignUp ? 'translate-x-[20%]' : 'translate-x-0'}`}>
              <h1 className="font-bold text-3xl mb-2">Hello, Friend!</h1>
              <p className="text-sm font-light mb-8">Enter your personal details and start journey with us</p>
              <button className="button-style-outline border-white" onClick={toggleMode}>
                Sign Up
              </button>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}

export default Login