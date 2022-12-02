export type TDate = string | number | object | null | undefined;

type TFormat = (date: TDate) => TDate;

export const formatDate: TFormat = (date: TDate): TDate => {
  let convertDate: TDate = null;
  if (typeof date === 'number') {
    let copyDate = new Date(date);
    let day =
      copyDate.getDate() < 10 ? `0${copyDate.getDate()}` : copyDate.getDate();
    let month =
      copyDate.getMonth() < 10
        ? `0${copyDate.getMonth() + 1}`
        : copyDate.getMonth() + 1;
    convertDate = `${day}.${month}.${copyDate.getFullYear()}`;
  }
  if (typeof date === 'object' && date) {
    convertDate = Date.parse(date.toString());
  }
  if (typeof date === 'string' && date) {
    let arrDate = date.split('.');
    let day = arrDate[0][0] === '0' ? +arrDate[0][1] : +arrDate[0];
    let month = arrDate[1][0] === '0' ? +arrDate[1][1] - 1 : +arrDate[1] - 1;
    let year = +arrDate[2];
    console.log(arrDate);
    let dateFormat = new Date(year, month, day);
    convertDate = Date.parse(dateFormat.toString());
  }
  return convertDate;
};
