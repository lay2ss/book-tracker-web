import logoname from "../assets/logo/logo_name.svg";
import b_purple_logo from "../assets/logo/b_purple_logo.svg";
import { verifyEmail } from "../services/bookService";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useState } from "react";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const handleVerify = async () => {
    setLoading(true);
    try{
      await verifyEmail(
        token,
      )
      alert("Email verified successfully! You can now log in.");
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
              <h2 className="font-bold text-2xl mb-4">Activate account</h2>
              <p className="mb-4">Click the button below to verify your email.</p>
              <div className="relative w-full">
              </div>
              <button onClick={handleVerify} 
              disabled={loading} 
              type='button' 
              className="button-style mt-3 cursor-pointer text-[#252033]">
                {loading? <Loading/> : "Verify"}
              </button>
            </form>
        </main>
    </section>
  )
}

export default VerifyEmail