export function dateFormatter(stringDate) {
  const date = new Date(stringDate);
  const dateMDY = `${
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  }.${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }.${date.getFullYear()}`;
  return dateMDY;
}

export function formatDateForServer(date) {
  if (!date) return "";
  const d = new Date(date);
  const offset = d.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(d.getTime() - offset);
  return adjustedDate.toISOString().split("T")[0];
}
