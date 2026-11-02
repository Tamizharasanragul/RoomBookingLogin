// TR GROUPS API Client

export const registerUserApi = async (userData) => {
  const endpoints = [

    'http://localhost:5000/api/users/register',

  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      return data;
    } catch (err) {
      // Continue to next endpoint if network connection failed
    }
  }

  throw new Error(
    'Cannot connect to backend server. Please verify "node server.js" is running.'
  );
};

export const loginUserApi = async (credentials) => {
  const endpoints = [
    '/api/users/login',
    'http://localhost:5000/api/users/login',

  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await res.json();
      return data;
    } catch (err) {
      // Continue to next endpoint if network connection failed
    }
  }

  throw new Error(
    'Cannot connect to backend server. Please verify "node server.js" is running.'
  );
};
