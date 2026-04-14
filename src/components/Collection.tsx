import type React from "react";

interface CollectionProps{
    name: string;
    qnt: number;
}

const Collection: React.FC<CollectionProps> = ({name, qnt}) => {
  return (
      <div className="bg-dark-purple rounded-xl w-full p-3 sm:w-50 cursor-pointer">
          <h2>{name}</h2>
          <p className="opacity-65 text-sm">{qnt >=1 ? qnt + " books" : "0"}</p>
      </div>
  )
}

export default Collection