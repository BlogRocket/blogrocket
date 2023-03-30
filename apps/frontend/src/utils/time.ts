/**
 * humanizeTime
 * takes in a date and returns a human readable time duration to current
 * 
 * if date difference is greater than a day, return the date
 */
export const humanizeTime = (date: Date | string | number) => {
  const dateObj = new Date(date);
  const now = new Date();
  const diff = now.getTime() - dateObj.getTime();
  const diffInMinutes = diff / 1000 / 60;

  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)} minutes ago`;
  } else if (diffInMinutes < 60 * 24) {
    return `${Math.floor(diffInMinutes / 60)} hours ago`;
  } else {
    return dateObj.toLocaleDateString();
  }
}