import logoname from "../assets/logo/logo_name.svg";
import b_purple_logo from "../assets/logo/b_purple_logo.svg";
import { forgotPassword } from "../services/bookService";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useState } from "react";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!email.trim()) {
    alert("Please enter your email address.");
    return;
    }
    setLoading(true);

    try{
      await forgotPassword(
        email.trim(),
      )
      alert("If an account is associated with this email, you will receive a password reset link shortly.");
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
        setLoading(false);
      }  
  };

  return (
    <section className="justify-start pt-20 password-page font-inter">
      <div className='flex mx-auto items-center gap-2 pb-5'>
        <img src={b_purple_logo} alt="logo name" className='w-13'/>
        <img src={logoname} alt="logo name" className='w-23' />
      </div> 
        <main className="password-page-main gray-shadow">
          <form className="form-style xl:max-w-2/3 mx-auto">
              <h2 className="font-bold text-2xl mb-4">Forgot password</h2>
              <p className="mb-4">Enter the email address associated with your account to receive a password reset link.</p>
              <input
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              placeholder="Email" 
              className="input-style" />
              <div className="relative w-full">
              </div>
              <button onClick={handleSend} 
              disabled={loading} 
              type='button' 
              className="button-style mt-3 cursor-pointer text-[#252033]">
                {loading? <Loading/> : "Send"}
              </button>
            </form>
        </main>
    </section>
  )
}

export default ForgotPassword