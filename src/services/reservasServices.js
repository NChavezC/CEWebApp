export async function getReservas() {
  const respuesta = await fetch("http://localhost:8000/reservas");
  if (!respuesta.ok) {
    throw new Error("Error al obtener los Reservas");
  }
  const data = await respuesta.json();
  return data;
}

export async function addReserva(data) {
  const respuesta = await fetch("http://localhost:8000/reservas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!respuesta.ok) {
    throw new Error("Error al agregar la reserva");
  }

  return await respuesta.json();
}

export async function patchReserva(reservaId, updatedFields) {
  const filteredFields = Object.fromEntries(
    Object.entries(updatedFields).filter(
      ([_, value]) => value !== undefined && value !== ""
    )
  );
  console.log(`For reserva ${reservaId}`, filteredFields);
  if (Object.keys(filteredFields).length === 0) {
    throw new Error("No hay datos para actualizar");
  }
  const respuesta = await fetch(`http://localhost:8000/reservas/${reservaId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filteredFields),
  });
  if (!respuesta.ok) {
    throw new Error("Error al actualizar los datos del reserva");
  }
  return await respuesta.json();
}

export async function deleteReserva(id) {
  const respuesta = await fetch(`http://localhost:8000/reservas/${id}`, {
    method: "DELETE",
  });

  if (!respuesta.ok) {
    throw new Error("Error al eliminar la reserva");
  }
}
