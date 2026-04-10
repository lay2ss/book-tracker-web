import { useState, useEffect } from "react";

interface DatePickerProps {
  onDateChange: (month: number, year: number) => void
  initialMonth?: any;
  initialYear?: any;
}

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const today = new Date();
const currentMonth = today.getMonth() + 1;
const currentYear = today.getFullYear();

const years = Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i);

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange, initialMonth, initialYear }) =>{

  const [month, setMonth] = useState<number>(initialMonth ?? today.getMonth());
  const [year, setYear] = useState<number>(initialYear ?? today.getFullYear());

  useEffect(() => {
    if (initialMonth !== undefined) setMonth(initialMonth);
    if (initialYear !== undefined) setYear(initialYear);
  }, [initialMonth, initialYear]);

  const updateDate = (newMonth: number, newYear: number) => {
    setMonth(newMonth);
    setYear(newYear);
    onDateChange(newMonth, newYear);
  };

  return (
    <div className="w-fit flex gap-2">
      <select value={month} onChange={(e) => updateDate(Number(e.target.value), Number(year))} className="picker-style w-30.25">
        {year === currentYear? months.slice(0, currentMonth).map((m, i) => (
          <option key={i} value={i}>{m}</option>
        ))  : months.map((m, i) => (
          <option key={i} value={i}>{m}</option>
        ))}
      </select>

      <select value={year} onChange={(e) => updateDate(Number(month), Number(e.target.value))} className="picker-style">
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
};

export default DatePicker;