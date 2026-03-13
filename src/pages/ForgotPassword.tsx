import logoname from "../assets/logo/logo_name.svg";
import b_purple_logo from "../assets/logo/b_purple_logo.svg";

const ForgotPassword = () => {
  return (
    <section className="justify-start pt-20 password-page">
      <div className='flex mx-auto items-center gap-2 pb-5'>
        <img src={b_purple_logo} alt="logo name" className='w-13'/>
        <img src={logoname} alt="logo name" className='w-23' />
      </div> 
        <main className="w-[90vw] md:w-[60vw] lg:w-[50vw] rounded-2xl h-min gray-shadow mx-auto p-5 md:p-10 max-w-175">
          <form className="form-style xl:max-w-2/3 mx-auto">
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