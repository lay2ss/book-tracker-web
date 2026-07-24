import { useState } from "react";
import visibility_off from "../assets/icon/visibility_off.svg";
import visibility from "../assets/icon/visibility.svg";
import { changePassword } from "../services/bookService";
import Loading from "../components/Loading";
import SimpleAlert from '../components/SimpleAlert';

const ChangePassword = () => {

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const toggleNewPassword = () => setShowNewPassword(!showNewPassword);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const successMessage = "Password updated";

    const handleSave = async () => {

      setLoading(true);
      try{
        await changePassword(
          oldPassword,
          newPassword
        )
        setShowAlert(true);
        setAlertMessage(successMessage);
      } catch (err: any) {
          console.error(err);
          if (err.response && err.response.data) {
            const backendMessage = err.response.data.message || "Invalid request.";
            setShowAlert(true);
            setAlertMessage(backendMessage);
          } else {
            setShowAlert(true);
            setAlertMessage("Something went wrong. Please try again later.");
          }
        }  finally {
          setLoading(false);
        }  
    }

    return ( 
    <section className="justify-center password-page font-inter"> 
      {showAlert && (
            <SimpleAlert 
              severity={alertMessage === successMessage? 'success' : 'warning'}
              message={alertMessage} 
              onClose={() => setShowAlert(false)}
              goTo={alertMessage === successMessage? '/settings' : ''}
              time={alertMessage === successMessage? 3000 : 5000}
            />
      )}
        <main className="password-page-main gray-shadow">
          <form className="form-style xl:max-w-2/3 mx-auto">
              <h2 className="font-bold text-2xl mb-4">Change password</h2>
              <p className="mb-4">For security reasons, please enter your current password first to update your account.</p>
              <div className="relative w-full">
                <input 
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)} 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Current password" 
                className="input-style"/>
                <button type="button" onClick={togglePassword} className="right-3 top-5 icon-style">
                  <img src={showPassword ? visibility_off : visibility} alt="view" className="w-5" />
                </button>
              </div>
              <div className="relative w-full">
                <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}  
                type={showNewPassword ? 'text' : 'password'} 
                placeholder="New password" 
                className="input-style"/>
                <button type="button" onClick={toggleNewPassword} className="right-3 top-5 icon-style">
                  <img src={showNewPassword ? visibility_off : visibility} alt="view" className="w-5" />
                </button>
              </div>
              <div className="relative w-full">
              </div>
              <button 
              onClick={handleSave}
              disabled={loading}
              type='button' 
              className="button-style mt-3 cursor-pointer text-[#252033]">
                {loading? <Loading/> : "Continue"}
              </button>
            </form>
        </main>
    </section>
    )
}

export default ChangePassword