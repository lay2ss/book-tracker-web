interface GenresProps{
    genre: string;
    isSelected: boolean; 
    onClick: () => void;
}

const Genres: React.FC<GenresProps> = ({genre, isSelected, onClick}) => {
  
  return (
    <button type="button" 
    onClick={onClick} 
    className={`px-2 py-1 purple-border border rounded-full cursor-pointer text-sm transition-transform active:scale-97 ${isSelected? "text-[#252033] bg-[#b99ef6] border-none" : ""}`}>{genre}</button>
  )
}

export default Genres