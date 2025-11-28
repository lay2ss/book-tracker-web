import '../Login.css'
import { useState } from 'react';

const Login = () => {
  const [changeLogin, setchangeLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const changeScreen = () => {
    return setchangeLogin(!changeLogin);
  }
  const passwordToView = () => {
    return setShowPassword(!showPassword);
  };

  return ( 
      <section className='flex h-screen w-full justify-center flex-col'>
      <img src="src/assets/logo/logo_name.png" alt="logo name" className='pb-2 mx-auto'/>
      <div className='lg:flex mx-auto'>
        <div className='w-[500px] bg-login hidden lg:flex rounded-tl-2xl rounded-bl-2xl text-white flex-col text-center'>
          <div className='w-[300px] mx-auto my-auto'>
            <h1 className='mx-auto text-4xl inter-semibold pb-3'>{changeLogin? 'Hello, Friend!' : 'Welcome back!'}</h1>
            <p className='inter-regular text-xl'>{changeLogin? 'Enter your personal details and start  journey with us' : 'To keep connect with us please login with your personal info'}</p>
            <button className='inter-regular text-white bg-transparent mt-6 button-style border' onClick={changeScreen}>{changeLogin? 'SIGN UP' : 'SIGN IN'}</button>
          </div>
        </div>
          <main className='bg-white w-[90vw] md:w-[70vw] lg:w-[500px] rounded-2xl h-min gray-shadow mx-auto lg:m-0 lg:rounded-bl-none lg:rounded-tl-none lg:h-[596px]'>
            <div className={`${!changeLogin? 'block' : 'hidden'}`}>
              <h2 className='inter-bold gray-text text-3xl text-center pt-7'>Create Account</h2>
              <input type="text" name="" id="" placeholder='Name' className='orange-border input-style mt-5'/>
              <input type="email" name="" id="" placeholder='Email' className='orange-border input-style mt-3'/>
              <div>
              <input type={showPassword? 'text' : 'password'} name="" id="" placeholder='Password' className='orange-border input-style mt-3'/>
              <button onClick={passwordToView} className='w-[83vw] md:w-[64vw] justify-end flex mt-2 lg:w-[440px] gap-1 inter-regular gray-text cursor-pointer'>
                <img src={showPassword? "src/assets/icon/visibility_off.svg" : "src/assets/icon/visibility.svg"} alt="visibility icon" />
                </button>
              </div>
              <button className='inter-regular text-white orange-bg mt-22 button-style border border-orange-400'>SIGN UP</button>
              <div className='inter-semibold text-center mt-30 pb-5 opacity-70 lg:hidden'>
                <p className='gray-text'>Already have an account?
                  <button className='pl-2 orange-text cursor-pointer hover:underline' onClick={changeScreen}>Sign in</button>
                </p>
                
              </div>
            </div>
            <div className={`${!changeLogin? 'hidden' : 'block'}`}>
              <h2 className='inter-bold gray-text text-3xl text-center pt-7'>Sign in</h2>
              <input type="email" name="" id="" placeholder='Email' className='orange-border input-style mt-5'/>
              <div>
              <input type={showPassword? 'text' : 'password'} name="" id="" placeholder='Password' className='orange-border input-style mt-3'/>
              <button onClick={passwordToView} className='w-[83vw] md:w-[64vw] justify-end flex mt-2 lg:w-[440px] gap-1 inter-regular gray-text cursor-pointer'>
                <img src={showPassword? "src/assets/icon/visibility_off.svg" : "src/assets/icon/visibility.svg"} alt="visibility icon" />
                </button>
              </div>
                <button className='inter-regular text-white orange-bg button-style mt-35 border border-orange-400'>SIGN IN</button>
                <button className='gray-text cursor-pointer inter-semibold opacity-70 mx-auto flex mt-3 hover:underline'>Forgot your password?</button>
                <div className='inter-semibold text-center mt-30 pb-5 opacity-70 lg:hidden'>
                  <p  className='gray-text'>Don’t have an account? 
                    <button className='pl-2 orange-text cursor-pointer hover:underline' onClick={changeScreen}>Sign up</button>
                  </p>
              </div>
            </div>
          </main>
      </div>
      </section>
  )
}

export default Login