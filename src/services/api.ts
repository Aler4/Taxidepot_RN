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
  });
};

export const addToApi = (derictory: string, method: string, body: object) => {
  if (!derictory || !method) {
    throw Error('not enough arguments');
  }

  return fetch(`https://edu.evgeniychvertkov.com/v1/${derictory}/`, {
    method: `${method.toUpperCase()}`,
    headers: {
      'X-Authorization':
        'apibb4d351a27bd4fea213bb5e3fb7213a403bcb8622fd8e005df288dd19f46e57d',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
