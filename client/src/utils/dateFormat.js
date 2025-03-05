function dateFormatter(stringDate) {
  let date = new Date(stringDate);
  let dateMDY = `${
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  }.${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }.${date.getFullYear()}`;
  return dateMDY;
}

export default dateFormatter;
