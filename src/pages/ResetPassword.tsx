import { useState } from "react";
import visibility_off from "../assets/icon/visibility_off.svg";
import visibility from "../assets/icon/visibility.svg";
import logoname from "../assets/logo/logo_name.svg";
import b_purple_logo from "../assets/logo/b_purple_logo.svg";
import { resetPassword } from "../services/bookService";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams<{ token: string }>();

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);

    const handleReset = async () => {

      setLoading(true);
  
      try{
        await resetPassword(
          password,
          token
        )
        alert("Password updated successfully!");
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
              <h2 className="font-bold text-2xl mb-4">Reset password</h2>
              <p className="mb-4">Enter your new password</p>
              <div className="relative w-full">
                <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}  
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password" className="input-style"/>
                <button type="button" onClick={togglePassword} 
                className="right-3 top-5 icon-style">
                  <img src={showPassword ? visibility_off : visibility} alt="view" className="w-5" />
                </button>
              </div>
              <div className="relative w-full">
              </div>
              <button 
              disabled={loading} 
              onClick={handleReset}
              type='button' 
              className="button-style mt-3 cursor-pointer text-[#252033]">
                {loading? <Loading/> : "Reset"}
              </button>
            </form>
        </main>
    </section>
  )
}

export default ResetPassword