import { useState } from "react";

interface GenresProps{
    genre: string;
}

const Genres: React.FC<GenresProps> = ({genre}) => {

    const [isChecked, setIsChecked] = useState(false);
    const toggleState = () => setIsChecked(!isChecked);

  return (
    <button onClick={toggleState} className={`px-2 py-1 purple-border border rounded-full cursor-pointer text-sm transition-transform active:scale-97 ${isChecked? "text-[#252033] bg-[#b99ef6] border-none" : ""}`}>{genre}</button>
  )
}

export default Genres