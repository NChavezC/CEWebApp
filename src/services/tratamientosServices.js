const API_URL = import.meta.env.VITE_API_URL;

export async function getTratamientos() {
  const token = localStorage.getItem("access_token");

  if (!token)
    throw new Error("No access token found. User is not authenticated");

  const response = await fetch(`${API_URL}/tratamientos/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Attach token in Authorization header
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      "Failed to fetch tratamientos. Authentication may have failed."
    );
  }
  const data = await response.json();
  return data;
}

export async function createTratamiento(tratamiento) {
  const token = localStorage.getItem("access_token");
  if (!token)
    throw new Error("No access token found. User is not authenticated");
  const response = await fetch(`${API_URL}/tratamientos`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // Attach token in Authorization header
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tratamiento),
  });
  if (!response.ok) {
    throw new Error(
      "Failed to create tratamiento. Authentication may have failed."
    );
  }
  const data = await response.json();
  return data;
}

export async function updateTratamiento(id, tratamiento) {
  const token = localStorage.getItem("access_token");
  if (!token)
    throw new Error("No access token found. User is not authenticated");
  const response = await fetch(`${API_URL}/tratamientos/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`, // Attach token in Authorization header
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tratamiento),
  });
  if (!response.ok) {
    throw new Error(
      "Failed to update tratamiento. Authentication may have failed."
    );
  }
}

export async function deleteTratamiento(id) {
  const token = localStorage.getItem("access_token");
  if (!token)
    throw new Error("No access token found. User is not authenticated");
  const response = await fetch(`${API_URL}/tratamientos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // Attach token in Authorization header
    },
  });
  if (!response.ok) {
    throw new Error(
      "Failed to delete tratamiento. Authentication may have failed."
    );
  }
}
