interface CircularProgressProps {
  currentPage: number;
  totalPages: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ currentPage, totalPages }) => {
  const percent = Math.round((currentPage / totalPages) * 100);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * percent) / 100;

  return (
    <div className="w-10 relative">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#FF6C00"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs text-[#FF6C00]">
        {percent}%
      </div>
    </div>
  );
};

export default CircularProgress;