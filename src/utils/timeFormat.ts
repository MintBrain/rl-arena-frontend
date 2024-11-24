import dayjs from "dayjs";

// Pluralization helper for Russian
const pluralize = (num: number, one: string, few: string, many: string) => {
  const mod10 = num % 10;
  const mod100 = num % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return many;
  }
  if (mod10 === 1) {
    return one;
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return few;
  }
  return many;
};


/* Function to calculate time difference and format the message
   Get deadline in milliseconds */
const getTimeRemaining = (deadline: number)=> {
  const now = dayjs();
  const end = dayjs(deadline);

  if (now.isAfter(end) || deadline === 0) {
    return "Срок истек";
  }

  const diffInSeconds = end.diff(now, "second");
  const days = Math.floor(diffInSeconds / (24 * 60 * 60));
  const hours = Math.floor((diffInSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
  const seconds = diffInSeconds % 60;


  if (days > 0) {
    const daysText = pluralize(days, "день", "дня", "дней");
    return `${days === 1 ? 'Остался' : 'Осталось'} ${days} ${daysText}`;
  }
  if (hours > 0) {
    const hoursText = pluralize(hours, "час", "часа", "часов");
    return `${hours === 1 ? 'Остался' : 'Осталось'} ${hours} ${hoursText}`;
  }
  if (minutes > 0) {
    const minutesText = pluralize(minutes, "минута", "минуты", "минут");
    return `${minutes === 1 ? 'Осталась' : 'Осталось'} ${minutes} ${minutesText}`;
  }
  if (seconds > 0) {
    const secondsText = pluralize(seconds, "секунда", "секунды", "секунд");
    return `${seconds === 1 ? 'Осталась' : 'Осталось'} ${seconds} ${secondsText}`;
  }
  return 'Срок истек';
}

export { getTimeRemaining };