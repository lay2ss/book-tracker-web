import Loading from "./Loading";
import { useState, useEffect } from "react";
import { getCollections } from "../services/bookService";
import Collection from "./Collection";

interface AddCardProps{
    onCancel: any;
    isSelected: any;
    onSelect?: (id: string) => void;
    onAdd?: any;
}

const AddCardCollections: React.FC<AddCardProps> = ({onCancel, isSelected, onSelect, onAdd}) => {

    const [loading, setLoading] = useState(false);
    const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        setLoading(true);
        const data = await getCollections();
        setCollections(data);
      } catch (error) { 
        console.error("Failed to load collections:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCollections();
  }, []);

  return (
    <main className="relative min-w-80">
        <div className="border border-white/20 p-4 rounded-xl bg-[#1a191b]">
        {loading? <Loading /> :
        (<div className="flex flex-wrap gap-3 sm:gap-5 font-inter text-sm sm:text-[16px] overflow-y-auto max-w-200 max-h-130">
            {collections.map((collection) => (
                        <Collection
                        key={collection.id}
                        name={collection.name}
                        id={collection.id}
                        qnt={collection._count.books}
                        isSelected={isSelected.includes(collection.id)}
                        onSelect={onSelect}
                        />
                        ))}
            </div>
        )}
            <div className="flex gap-2 pt-5 justify-end">
                <button onClick={onAdd} disabled={false} className='h-min py-3 px-5 cursor-pointer text-[#1A1625] addButtonActived'>Add</button>
                <button onClick={onCancel} className='h-min py-3 px-5 cursor-pointer addButton'>Cancel</button>
            </div>
        </div>
    </main>
  )
}

export default AddCardCollections