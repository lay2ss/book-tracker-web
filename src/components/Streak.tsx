interface StreakProps{
    books: any[];
}

const Streak: React.FC<StreakProps> = ({books}) => {

  const dates = books
    .map(book => {
      const d = new Date(book.updatedAt);
      d.setHours(0, 0, 0, 0); 
      return d.getTime();     
    })
    .filter((value, index, self) => self.indexOf(value) === index) 
    .sort((a, b) => b - a); 

  if (dates.length === 0) return <>0 days</>;;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayMs = today.getTime();
  
  const mostRecentUpdateMs = dates[0];

  const diffInDays = Math.round((todayMs - mostRecentUpdateMs) / (1000 * 60 * 60 * 24));

  if (diffInDays > 1) return <>0 days</>;

  let streak = 1;
  for (let i = 0; i < dates.length - 1; i++) {
    const current = dates[i];
    const next = dates[i + 1];

    const diff = Math.round((current - next) / (1000 * 60 * 60 * 24));
    
    if (diff === 1) {
      streak++;
    } else if (diff > 1) {

      break;
    }

  }

  return (
    <span>
      {streak} {streak > 1 ? "days" : "day"}
    </span>
  );
}

export default Streak;