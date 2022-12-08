import { TCar, TDriver } from "../redux/types";

type TCompare = (
  firstObj: TDriver | TCar,
  secondObj: TDriver | TCar,
) => boolean;

export const makeCompare: TCompare = (firstObj, secondObj) => {
  let keys: string = Object.keys(firstObj);
  let isDif: boolean = false;

  for (let key of keys) {
    if (
      firstObj[key] &&
      typeof firstObj[key] === 'object' &&
      secondObj[key] !== null &&
      typeof secondObj[key] === 'object'
    ) {
      isDif = makeCompare(firstObj[key], secondObj[key]);
    } else {
      isDif = firstObj[key] !== secondObj[key];
    }

    if (isDif) {
      break;
    }
  }
  return isDif;
};
