import { useState } from "react";

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const today = new Date();
const currentMonth = today.getMonth() + 1;
const currentYear = today.getFullYear();

const years = Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i);

const DatePicker: React.FC = () => {
  const [month, setMonth] = useState<number>();
  const [year, setYear] = useState<number>();

  return (
    <div className="w-fit flex gap-2">
      <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="picker-style w-30.25">
        {year === currentYear? months.slice(0, currentMonth).map((m, i) => (
          <option key={i} value={i}>{m}</option>
        ))  : months.map((m, i) => (
          <option key={i} value={i}>{m}</option>
        ))}
      </select>

      <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="picker-style">
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
};

export default DatePicker;