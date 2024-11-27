const formatDate = (date: string | Date) => new Date(new Date(date).toISOString().split("T")[0]);

function getWeekdays(today: Date = new Date()): Date[] {
  const startOfWeek = new Date(today);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
  const weekdays = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = formatDate(startOfWeek)
    currentDate.setDate(currentDate.getDate() + i);
    weekdays.push(new Date(currentDate));
  }
  return weekdays;
}

export default getWeekdays;