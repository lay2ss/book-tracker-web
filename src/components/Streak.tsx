interface StreakProps{
    books: any[];
}

const Streak: React.FC<StreakProps> = ({books}) => {

  const dates = books
    .map(book => new Date(book.updatedAt).toDateString())
    .filter((value, index, self) => self.indexOf(value) === index)
    .map(dateStr => new Date(dateStr))
    .sort((a, b) => b.getTime() - a.getTime());

  if (dates.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const mostRecentUpdate = dates[0];
  mostRecentUpdate.setHours(0, 0, 0, 0);

  const diffInMs = today.getTime() - mostRecentUpdate.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays > 1) return 0;

  let streak = 1;
  for (let i = 0; i < dates.length - 1; i++) {
    const current = dates[i];
    const next = dates[i + 1];

    const diff = (current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24);
    
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export default Streak