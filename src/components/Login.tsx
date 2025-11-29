import { useState } from 'react';

const Login = () => {
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleMode = () => setIsSignUp(!isSignUp);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <section className='flex h-screen w-full justify-center flex-col font-inter overflow-hidden'>
      
      <img src="src/assets/logo/logo_name.png" alt="logo name" className='pb-5 mx-auto w-40' />

      {/* mobile */}
      <div className='lg:hidden mx-auto'>
        <main className='bg-white w-[90vw] md:w-[70vw] rounded-2xl h-min gray-shadow mx-auto'>
          
          {/* mobile sign up form */}
          <div className={`p-10 ${isSignUp ? 'block' : 'hidden'}`}>
            <h2 className='inter-bold gray-text text-3xl text-center pt-10 pb-5'>Create Account</h2>
            <input type="text" placeholder="Name" className="input-style" />
            <input type="email" placeholder="Email" className="input-style" />
            <div className="relative w-full">
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="input-style" />
                <button type="button" onClick={togglePassword} className="absolute right-3 top-5 opacity-50 hover:opacity-100">
                  <img src={showPassword ? "src/assets/icon/visibility_off.svg" : "src/assets/icon/visibility.svg"} alt="view" className="w-5" />
                </button>
            </div>
            <button className='button-style mx-auto flex mt-8'>Sign up</button>
            <div className='inter-semibold text-center mt-10 pb-10 opacity-70'>
              <p className='gray-text'>Already have an account?
                <button className='button-style-underline' onClick={toggleMode}>Sign in</button>
              </p>
            </div>
          </div>

          {/* mobile sign in form */}
          <div className={`p-10 ${!isSignUp ? 'block' : 'hidden'}`}>
            <h2 className='inter-bold gray-text text-3xl text-center pt-10 pb-5'>Sign In</h2>
            <input type="email" placeholder="Email" className="input-style" />
            <div className="relative w-full">
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="input-style" />
                <button type="button" onClick={togglePassword} className="absolute right-3 top-5 opacity-50 hover:opacity-100">
                  <img src={showPassword ? "src/assets/icon/visibility_off.svg" : "src/assets/icon/visibility.svg"} alt="view" className="w-5" />
                </button>
            </div>
            <button className='button-style mx-auto flex mt-8'>Sign in</button>
            <button className='gray-text cursor-pointer inter-semibold opacity-70 mx-auto flex mt-3 hover:underline'>Forgot your password?</button>
            <div className='inter-semibold text-center mt-10 pb-10 opacity-70'>
              <p className='gray-text'>Don’t have an account?
                <button className='button-style-underline' onClick={toggleMode}>Sign up</button>
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* desktop */}
      <div className='hidden lg:block w-[800px] max-w-full min-h-[500px] bg-white rounded-[20px] shadow-2xl relative overflow-hidden mx-auto'>
        
        {/* desktop sign up form */}
        <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 flex items-center justify-center flex-col px-10 
          ${isSignUp ? 'translate-x-full opacity-100 z-50' : 'opacity-0 z-0'}`}>
            
            <form className="form-style">
              <h1 className="font-bold text-3xl mb-4 gray-text">Create Account</h1>
              <input type="text" placeholder="Name" className="input-style" />
              <input type="email" placeholder="Email" className="input-style" />
              <div className="relative w-full">
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="input-style" />
                <button type="button" onClick={togglePassword} className="absolute right-3 top-5 opacity-50 hover:opacity-100">
                  <img src={showPassword ? "src/assets/icon/visibility_off.svg" : "src/assets/icon/visibility.svg"} alt="view" className="w-5" />
                </button>
              </div>
              <button type='button' className="button-style mt-3">
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
                <button type="button" onClick={togglePassword} className="absolute right-3 top-5 opacity-50 hover:opacity-100">
                  <img src={showPassword ? "src/assets/icon/visibility_off.svg" : "src/assets/icon/visibility.svg"} alt="view" className="w-5" />
                </button>
              </div>
              <a href="#" className="gray-text text-sm my-4 hover:underline">Forgot your password?</a>
              <button  type='button' className="button-style mt-3">
                Sign In
              </button>
            </form>
        </div>

        {/* overlay container */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-50
          ${isSignUp ? '-translate-x-full' : ''}`}>
          
          <div className={`bg-login text-white relative -left-full h-full w-[200%] transform transition-transform duration-600 ease-in-out
            ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'}`}
            style={{ background: 'linear-gradient(to right, #FF2600, #FF6C00)' }}>
            
            {/* left panel (sign up) */}
            <div className={`absolute flex flex-col items-center justify-center h-full w-1/2 px-8 text-center top-0 transform transition-transform duration-600 ease-in-out
              ${isSignUp ? 'translate-x-0' : '-translate-x-[20%]'}`}>
              <h1 className="font-bold text-3xl mb-2">Welcome Back!</h1>
              <p className="text-sm font-light mb-8">To keep connected with us please login with your personal info</p>
              <button className="button-style-outline" onClick={toggleMode}>
                Sign In
              </button>
            </div>

            {/* right panel (sign in) */}
            <div className={`absolute right-0 flex flex-col items-center justify-center h-full w-1/2 px-8 text-center top-0 transform transition-transform duration-600 ease-in-out
              ${isSignUp ? 'translate-x-[20%]' : 'translate-x-0'}`}>
              <h1 className="font-bold text-3xl mb-2">Hello, Friend!</h1>
              <p className="text-sm font-light mb-8">Enter your personal details and start journey with us</p>
              <button className="button-style-outline" onClick={toggleMode}>
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