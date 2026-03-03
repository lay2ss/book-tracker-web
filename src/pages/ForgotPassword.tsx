const ForgotPassword = () => {
  return (
    <section className="flex h-screen w-full justify-start flex-col font-inter text-white pt-20">
      <div className='flex mx-auto items-center gap-2 pb-5'>
        <img src="src/assets/logo/b_purple_logo.svg" alt="logo name" className='w-13'/>
        <img src="src/assets/logo/logo_name.svg" alt="logo name" className='w-23' />
      </div> 
        <main className="w-[90vw] md:w-[60vw] lg:w-[50vw] rounded-2xl h-min gray-shadow mx-auto p-5 md:p-10">
          <form className="form-style xl:max-w-1/2 mx-auto">
              <h2 className="font-bold text-2xl mb-4">Forgot password</h2>
              <p className="mb-4">Enter the email address associated with your account to receive a password reset link.</p>
              <input type="email" placeholder="Email" className="input-style" />
              <div className="relative w-full">
              </div>
              <button type='button' className="button-style mt-3 cursor-pointer text-[#252033]">
                Send
              </button>
            </form>
        </main>
    </section>
  )
}

export default ForgotPassword