import '../Login.css'

const Login = () => {
  return ( 
    <>
      <section className='flex h-screen w-full justify-center'>
      <div className='my-auto'>
        <img src="src/assets/logo/logo_name.png" alt="logo name" className='pb-2 mx-auto'/>
          <main className='bg-white w-[90vw] md:w-[70vw] rounded-2xl h-min gray-shadow'>
            <h1 className='inter-bold gray-text text-3xl text-center pt-7'>Create Account</h1>
            <input type="text" name="" id="" placeholder='Name' className='orange-border input-style mt-5'/>
            <input type="email" name="" id="" placeholder='Email' className='orange-border input-style mt-3'/>
            <input type="password" name="" id="" placeholder='Password' className='orange-border input-style mt-3' />
            <button className='inter-regular text-white orange-bg mt-30 button-style'>SIGN UP</button>
            <div className='inter-semibold text-center mt-30 pb-5 opacity-70'>
              <p className='gray-text'>If you already have one</p>
              <button className='orange-text cursor-pointer hover:border-b'>Sign in</button>
            </div>
          </main>
      </div>
      </section>
    </>
  )
}

export default Login