export type TDate = string | number | object | null;

type TFormat = (date: number | undefined) => TDate;

export const formatDate: TFormat = (date: TDate): null | string | number => {
  let convertDate: TDate = null;
  if (typeof date === 'number') {
    let copyDate = new Date(date);
    let day =
      copyDate.getDate() < 10 ? `0${copyDate.getDate()}` : copyDate.getDate();
    let month =
      copyDate.getMonth() < 10
        ? `0${copyDate.getMonth()}`
        : copyDate.getMonth();
    convertDate = `${day}.${month}.${copyDate.getFullYear()}`;
  }
  if (typeof date === 'object' && date) {
    convertDate = Date.parse(date.toString());
  }
  return convertDate;
};
