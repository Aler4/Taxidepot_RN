import {TCar, TDriver} from '../redux/types';

type TProp = (cars: TCar[], drivers: TDriver[]) => TCar[] | [];

export const mergeProp: TProp = (cars, drivers) => {
  let result = [];
  for (let car: TCar of cars) {
    for (let driver: TDriver of drivers) {
      if (car.driver_id == driver.id) {
        car.driver = `${driver.first_name} ${driver.last_name}`;
      }
    }
    result.push(car);
  }
  return result;
};
