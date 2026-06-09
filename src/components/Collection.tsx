import type React from "react";

interface CollectionProps{
    name: string;
    qnt: number;
    isSelected?: boolean;
    onSelect?: (id: string) => void;
    id?: string;
}

const Collection: React.FC<CollectionProps> = ({name, qnt, isSelected, onSelect, id}) => {
  return (
      <div onClick={() => onSelect?.(String(id))} className={`bg-dark-purple rounded-xl w-full p-3 sm:w-50 cursor-pointer ${isSelected? 'border-2 rounded-md purple-border' : ''}`}>
          <h2>{name}</h2>
          <p className="opacity-65 text-sm">{Number(qnt)? qnt == 1? qnt + " book" : qnt + " books" : ":/"}</p>
      </div>
  )
}

export default Collection