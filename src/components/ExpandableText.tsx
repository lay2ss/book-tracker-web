import { useState } from "react";

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text, maxLength = 150 }) => {
  const [expanded, setExpanded] = useState(false);

  const isLongText = text.length > maxLength;
  const displayedText = expanded || !isLongText ? text : text.slice(0, maxLength) + '...';

  return (
    <div>
      <p>{displayedText}</p>
      {isLongText && (
        <button onClick={() => setExpanded(!expanded)} className="cursor-pointer font-inter text-purple-600 hover:underline">
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;