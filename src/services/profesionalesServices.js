const API_URL = import.meta.env.VITE_API_URL;

export async function getProfesionales() {
  const token = localStorage.getItem("access_token");

  if (!token)
    throw new Error("No access token found. User is not authenticated");

  const response = await fetch(`${API_URL}/profesionales/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Attach token in Authorization header
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      "Failed to fetch profesionales. Authentication may have failed."
    );
  }
  const data = await response.json();
  return data;
}

export async function createProfesional(profesional) {
  const token = localStorage.getItem("access_token");
  if (!token)
    throw new Error("No access token found. User is not authenticated");
  const response = await fetch(`${API_URL}/profesionales`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // Attach token in Authorization header
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profesional),
  });
  if (!response.ok) {
    throw new Error(
      "Failed to create profesional. Authentication may have failed."
    );
  }
  const data = await response.json();
  return data;
}

export async function updateProfesional(id, profesional) {
  const token = localStorage.getItem("access_token");
  if (!token)
    throw new Error("No access token found. User is not authenticated");
  const response = await fetch(`${API_URL}/profesionales/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`, // Attach token in Authorization header
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profesional),
  });
  if (!response.ok) {
    throw new Error(
      "Failed to update profesional. Authentication may have failed."
    );
  }
}

export async function deleteProfesional(id) {
  const token = localStorage.getItem("access_token");
  if (!token)
    throw new Error("No access token found. User is not authenticated");
  const response = await fetch(`${API_URL}/profesionales/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // Attach token in Authorization header
    },
  });
  if (!response.ok) {
    throw new Error(
      "Failed to delete profesional. Authentication may have failed."
    );
  }
}
