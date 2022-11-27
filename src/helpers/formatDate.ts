type TDate = string | number | null;

type TFormat = (date: TDate) => TDate;

export const formatDate: TFormat = (date: TDate): TDate => {
  let convertDate: TDate = null;
  if (typeof date === 'number') {
    let copyDate = new Date(date);
    let day = copyDate.getDate() < 10 ? `0${copyDate.getDate()}` : copyDate.getDate();
    convertDate = `${day}.${copyDate.getMonth()}.${copyDate.getFullYear()}`;
  }
  return convertDate;
};
