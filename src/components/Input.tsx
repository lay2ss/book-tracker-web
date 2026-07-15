import { useState } from "react";
import visibility_off from "../assets/icon/visibility_off.svg";
import visibility from "../assets/icon/visibility.svg";

interface InputProps{
    ValueName?: any;
    ValuePassword: any;
    ValueEmail: any;
    OnChange: any;
    show?: string;
}

const Input: React.FC<InputProps> = ({ ValuePassword, ValueEmail, ValueName, OnChange, show }) =>{

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <>
    <input type="text"
    name='name' 
    placeholder="Name" 
    className={`input-style ${show}`}
    value={ValueName}
    onChange={OnChange}
    />
    <input type="email" 
    name='email'
    placeholder="Email" 
    className="input-style"
    value={ValueEmail}
    onChange={OnChange}
    />
    <div className="relative w-full">
        <input type={showPassword ? 'text' : 'password'}
        name='password' 
        placeholder="Password" 
        className="input-style"
        value={ValuePassword}
        onChange={OnChange}
        />
        <button type="button" 
        onClick={togglePassword} 
        className="right-3 top-5 icon-style">
          <img src={showPassword ? visibility_off : visibility} alt="view" className="w-5" />
        </button>
    </div>
    </>
  )
}

export default Input