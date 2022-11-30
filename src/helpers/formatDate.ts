export type TDate = string | number | object | null;

type TFormat = (date: TDate) => TDate;

export const formatDate: TFormat = (date: TDate): null | string | number => {
  let convertDate: TDate= null;
  if (typeof date === 'number') {
    let copyDate = new Date(date);
    let day = copyDate.getDate() < 10 ? `0${copyDate.getDate()}` : copyDate.getDate();
    convertDate = `${day}.${copyDate.getMonth()}.${copyDate.getFullYear()}`;
  }
  if (typeof date === 'object' && date) {
    convertDate = Date.parse(date.toString());
  }
  return convertDate;
};
