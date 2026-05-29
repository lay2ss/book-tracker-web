import openBookIcon from "../assets/icon/open_book.svg";

interface GoalTrackerProps {
  current: number;
  max: number;
  label?: string;
  icon?: React.ReactNode;
  size?: number;
  strokeWidth?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

const GoalTracker: React.FC<GoalTrackerProps> = ({
  current,
  max,
  label = "Yearly Goal",
  icon,
  size = 200,
  strokeWidth = 12,
  primaryColor = "text-[#b99ef6]",
  secondaryColor = "text-[#252033]",
}) => {

  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const arcLengthDegrees = 260;
  const arcLengthParams = (arcLengthDegrees / 360) * circumference;
  
  const safeCurrent = Math.min(current, max);
  const percentage = safeCurrent / max;
  
  const strokeDashoffset = circumference - (percentage * arcLengthParams);
  
  const rotation = 90 + (360 - arcLengthDegrees) / 2;

  return (
    <div className="flex flex-col items-center justify-center font-sans">
      <div className="relative" style={{ width: size, height: size }}>

        <svg
          className="w-full h-full transform"
          style={{ transform: `rotate(${rotation}deg)` }}
        >

          <circle
            className={`stroke-current ${secondaryColor}`}
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={center}
            cy={center}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - arcLengthParams}
            strokeLinecap="round"
          />

          <circle
            className={`stroke-current ${primaryColor} transition-all duration-1000 ease-out`}
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={center}
            cy={center}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
          
          <span className={`text-2xl font-bold ${primaryColor}`}>
            {current}/{max}
          </span>

          <div className="my-1">
            {icon ? icon : (
              <img src={openBookIcon} alt="open book icon" />
            )}
          </div>
        </div>
      </div>
      
      <span className="font-semibold text-lg -mt-4">
        {current >= max? (<p className="mt-5">You achieved your goal :D</p>) : label}
      </span>
    </div>
  );
};

export default GoalTracker;