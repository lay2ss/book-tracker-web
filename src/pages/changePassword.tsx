import { useState } from "react";
import visibility_off from "../assets/icon/visibility_off.svg";
import visibility from "../assets/icon/visibility.svg";

const ChangePassword = () => {

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const toggleNewPassword = () => setShowNewPassword(!showNewPassword);

    return ( 
    <section className="flex h-screen w-full justify-center flex-col font-inter text-white"> 
        <main className="w-[90vw] md:w-[60vw] lg:w-[50vw] max-w-175 rounded-2xl h-min gray-shadow mx-auto p-5 md:p-10">
          <form className="form-style xl:max-w-2/3 mx-auto">
              <h2 className="font-bold text-2xl mb-4">Change password</h2>
              <p className="mb-4">For security reasons, please enter your current password first to update your account.</p>
              <div className="relative w-full">
                <input type={showPassword ? 'text' : 'password'} placeholder="Current password" className="input-style"/>
                <button type="button" onClick={togglePassword} className="right-3 top-5 icon-style">
                  <img src={showPassword ? visibility_off : visibility} alt="view" className="w-5" />
                </button>
              </div>
              <div className="relative w-full">
                <input type={showNewPassword ? 'text' : 'password'} placeholder="New password" className="input-style"/>
                <button type="button" onClick={toggleNewPassword} className="right-3 top-5 icon-style">
                  <img src={showNewPassword ? visibility_off : visibility} alt="view" className="w-5" />
                </button>
              </div>
              <div className="relative w-full">
              </div>
              <button type='button' className="button-style mt-3 cursor-pointer text-[#252033]">
                Continue
              </button>
            </form>
        </main>
    </section>
    )
}

export default ChangePassword