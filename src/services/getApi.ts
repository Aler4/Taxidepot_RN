export const getApi = (derictory: string) =>
  fetch(`https://edu.evgeniychvertkov.com/v1/${derictory}/`, {
    method: 'GET',
    headers: {
      'X-Authorization':
        'apibb4d351a27bd4fea213bb5e3fb7213a403bcb8622fd8e005df288dd19f46e57d',
    },
  });
