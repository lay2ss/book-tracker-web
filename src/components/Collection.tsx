import type React from "react";
import chevronIcon from "../assets/icon/chevron_right.svg";

interface CollectionProps{
    name: string;
    qnt: number;
    isSelected?: boolean;
    onSelect?: (id: string) => void;
    id?: string;
}

const Collection: React.FC<CollectionProps> = ({name, qnt, isSelected, onSelect, id}) => {
  return (
      <div onClick={() => onSelect?.(String(id))} className={`bg-white/5 rounded-xl p-3 cursor-pointer ${isSelected? 'border-2 rounded-md purple-border' : ''}`}>
        <div className="flex justify-between">
            <div>
                <h2>{name}</h2>
                <p className="opacity-65 text-sm text-start">{Number(qnt)? qnt == 1? qnt + " book" : qnt + " books" : "0"}</p>
            </div>
            <img src={chevronIcon} alt="chevron icon" />
        </div>
      </div>
  )
}

export default Collection