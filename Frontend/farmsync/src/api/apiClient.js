const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const getToken = () => sessionStorage.getItem('token');

export const apiGet = async (path) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401) {
    sessionStorage.clear();
    window.location.href = '/login';
    return;
  }

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
};

export const apiPost = async (path, body) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (response.status === 401) {
    sessionStorage.clear();
    window.location.href = '/login';
    return;
  }

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
};

export const apiDelete = async (path) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401) {
    sessionStorage.clear();
    window.location.href = '/login';
    return;
  }

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
};

export const apiPut = async (path, body) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (response.status === 401) {
    sessionStorage.clear();
    window.location.href = '/login';
    return;
  }

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
};