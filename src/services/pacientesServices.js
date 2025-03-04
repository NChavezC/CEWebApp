const API_URL = import.meta.env.VITE_API_URL;

export async function getPacientes() {
  const token = localStorage.getItem("access_token");

  if (!token)
    throw new Error("No access token found. User is not authenticated");

  const response = await fetch(`${API_URL}/pacientes/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Attach token in Authorization header
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      "Failed to fetch pacientes. Authentication may have failed."
    );
  }
  const data = await response.json();
  return data;
}

export async function createPaciente(paciente) {
  const token = localStorage.getItem("access_token");
  if (!token)
    throw new Error("No access token found. User is not authenticated");
  const response = await fetch(`${API_URL}/pacientes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // Attach token in Authorization header
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paciente),
  });
  if (!response.ok) {
    throw new Error(
      "Failed to create paciente. Authentication may have failed."
    );
  }
  const data = await response.json();
  return data;
}

export async function updatePaciente(id, paciente) {
  const token = localStorage.getItem("access_token");
  if (!token)
    throw new Error("No access token found. User is not authenticated");
  const response = await fetch(`${API_URL}/pacientes/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`, // Attach token in Authorization header
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paciente),
  });
  if (!response.ok) {
    throw new Error(
      "Failed to update paciente. Authentication may have failed."
    );
  }
}

export async function deletePaciente(id) {
  const token = localStorage.getItem("access_token");
  if (!token)
    throw new Error("No access token found. User is not authenticated");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // Attach token in Authorization header
    },
  });
  if (!response.ok) {
    throw new Error(
      "Failed to delete paciente. Authentication may have failed."
    );
  }
}
