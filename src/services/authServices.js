const API_URL = import.meta.env.VITE_API_URL;

export async function getToken(userData) {
  const response = await fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: userData.toString(),
  });
  const data = await response.json();
  return data;
}

export async function createUser(userData) {
  const response = await fetch(`${API_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return data;
}
