import type React from "react";
import { Link } from "react-router-dom";

interface CollectionProps{
    name: string;
    qnt: number;
}

const Collection: React.FC<CollectionProps> = ({name, qnt}) => {
  return (
    <Link to={`/collection/${name.toLowerCase()}/${qnt.toString()}`} className="w-full sm:w-50">
      <div className="bg-dark-purple rounded-xl w-full p-3 sm:w-50 cursor-pointer">
          <h2>{name}</h2>
          <p className="opacity-65 text-sm">{qnt} books</p>
      </div>
    </Link>
  )
}

export default Collection