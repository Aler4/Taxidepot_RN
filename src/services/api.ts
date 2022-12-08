import {TCar, TDriver} from '../redux/types';

export const getApi = (derictory: string) => {
  if (!derictory) {
    throw Error('not enough arguments');
  }

  return fetch(`https://edu.evgeniychvertkov.com/v1/${derictory}/`, {
    method: 'GET',
    headers: {
      'X-Authorization':
        'apibb4d351a27bd4fea213bb5e3fb7213a403bcb8622fd8e005df288dd19f46e57d',
    },
  })
    .then(response => response.json())
    .then(response => response.data);
};

export const addToApi = (
  derictory: string,
  method: string,
  body?: TCar | TDriver | undefined,
  id?: number,
) => {
  if (!derictory || !method) {
    throw Error('not enough arguments');
  }
  let url = `https://edu.evgeniychvertkov.com/v1/${derictory}/`;
  method = method.toUpperCase();

  if (method === 'PUT' && id) {
    url = `https://edu.evgeniychvertkov.com/v1/${derictory}/${id}/`;
  }
  console.log(body)
  console.log(method)
  return fetch(url, {
    method: `${method}`,
    headers: {
      'X-Authorization':
        'apibb4d351a27bd4fea213bb5e3fb7213a403bcb8622fd8e005df288dd19f46e57d',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
export const deleteFromApi = (derictory: string, id: number | undefined) => {
  if (!derictory || !id) {
    throw Error('not enough arguments');
  }

  return fetch(`https://edu.evgeniychvertkov.com/v1/${derictory}/${id}/`, {
    method: 'DELETE',
    headers: {
      'X-Authorization':
        'apibb4d351a27bd4fea213bb5e3fb7213a403bcb8622fd8e005df288dd19f46e57d',
    },
  });
};
