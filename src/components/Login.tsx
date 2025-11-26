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
    <>
      <section className='flex h-screen w-full justify-center'>
      <div className='my-auto'>
        <img src="src/assets/logo/logo_name.png" alt="logo name" className='pb-2 mx-auto'/>
          <main className='bg-white w-[90vw] md:w-[70vw] rounded-2xl h-min gray-shadow'>
            <div className={`${!changeLogin? 'block' : 'hidden'}`}>
              <h1 className='inter-bold gray-text text-3xl text-center pt-7'>Create Account</h1>
              <input type="text" name="" id="" placeholder='Name' className='orange-border input-style mt-5'/>
              <input type="email" name="" id="" placeholder='Email' className='orange-border input-style mt-3'/>
              <div>
              <input type={showPassword? 'text' : 'password'} name="" id="" placeholder='Password' className='orange-border input-style mt-3'/>
              <button onClick={passwordToView} className='w-[80vw] md:w-[60vw] justify-end flex mt-2 gap-1 inter-regular gray-text cursor-pointer'>
                <img src={showPassword? "src/assets/icon/visibility_off.svg" : "src/assets/icon/visibility.svg"} alt="visibility icon" />
                </button>
              </div>
              <button className='inter-regular text-white orange-bg mt-30 button-style'>SIGN UP</button>
              <div className='inter-semibold text-center mt-30 pb-5 opacity-70'>
                <p className='gray-text'>Already have an account?</p>
                <button className='orange-text cursor-pointer hover:border-b' onClick={changeScreen}>Sign in</button>
              </div>
            </div>
            <div className={`${!changeLogin? 'hidden' : 'block'}`}>
              <h1 className='inter-bold gray-text text-3xl text-center pt-7'>Sign in</h1>
              <input type="email" name="" id="" placeholder='Email' className='orange-border input-style mt-5'/>
              <div>
              <input type={showPassword? 'text' : 'password'} name="" id="" placeholder='Password' className='orange-border input-style mt-3'/>
              <button onClick={passwordToView} className='w-[80vw] md:w-[60vw] justify-end flex mt-2 gap-1 inter-regular gray-text cursor-pointer'>
                <img src={showPassword? "src/assets/icon/visibility_off.svg" : "src/assets/icon/visibility.svg"} alt="visibility icon" />
                </button>
              </div>
                <button className='gray-text cursor-pointer inter-semibold opacity-70 mx-auto flex mt-2 hover:underline'>Forgot your password?</button>
                <button className='inter-regular text-white orange-bg button-style mt-30'>SIGN IN</button>
                <div className='inter-semibold text-center mt-30 pb-5 opacity-70'>
                  <p  className='gray-text'>Don’t have an account?</p>
                  <button className='orange-text cursor-pointer hover:underline' onClick={changeScreen}>Sign up</button>
              </div>
            </div>
          </main>
      </div>
      </section>
    </>
  )
}

export default Login