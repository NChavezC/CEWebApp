const API_URL = import.meta.env.VITE_API_URL;

export async function getReservas() {
  const token = localStorage.getItem("access_token");

  if (!token)
    throw new Error("No access token found. User is not authenticated");

  const response = await fetch(`${API_URL}/reservas/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Attach token in Authorization header
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      "Failed to fetch reservas. Authentication may have failed."
    );
  }
  const data = await response.json();
  return data;
}

export async function createReserva(reserva) {
  const token = localStorage.getItem("access_token");
  if (!token)
    throw new Error("No access token found. User is not authenticated");
  const response = await fetch(`${API_URL}/reservas`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // Attach token in Authorization header
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reserva),
  });
  if (!response.ok) {
    throw new Error(
      "Failed to create reserva. Authentication may have failed."
    );
  }
  const data = await response.json();
  return data;
}

export async function updateReserva(id, reserva) {
  const token = localStorage.getItem("access_token");
  if (!token)
    throw new Error("No access token found. User is not authenticated");
  const response = await fetch(`${API_URL}/reservas/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`, // Attach token in Authorization header
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reserva),
  });
  if (!response.ok) {
    throw new Error(
      "Failed to update reserva. Authentication may have failed."
    );
  }
}

export async function deleteReserva(id) {
  const token = localStorage.getItem("access_token");
  if (!token)
    throw new Error("No access token found. User is not authenticated");
  const response = await fetch(`${API_URL}/reservas/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // Attach token in Authorization header
    },
  });
  if (!response.ok) {
    throw new Error(
      "Failed to delete reserva. Authentication may have failed."
    );
  }
}
