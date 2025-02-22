export async function getTratamientos() {
  const respuesta = await fetch("http://localhost:8000/tratamientos");
  if (!respuesta.ok) {
    throw new Error("Error al obtener los tratamientos");
  }
  const data = await respuesta.json();
  return data;
}

export async function addTratamiento(data) {
  const respuesta = await fetch("http://localhost:8000/tratamientos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!respuesta.ok) {
    throw new Error("Error al agregar el tratamiento");
  }

  return await respuesta.json();
}

export async function patchTratamiento(tratamientoId, updatedFields) {
  const filteredFields = Object.fromEntries(
    Object.entries(updatedFields).filter(
      ([_, value]) => value !== undefined && value !== ""
    )
  );
  console.log(`For tratamiento ${tratamientoId}`, filteredFields);
  if (Object.keys(filteredFields).length === 0) {
    throw new Error("No hay datos para actualizar");
  }
  const respuesta = await fetch(
    `http://localhost:8000/tratamientos/${tratamientoId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredFields),
    }
  );
  if (!respuesta.ok) {
    throw new Error("Error al actualizar los datos del tratamiento");
  }
  return await respuesta.json();
}

export async function deleteTratamiento(id) {
  const respuesta = await fetch(`http://localhost:8000/tratamientos/${id}`, {
    method: "DELETE",
  });

  if (!respuesta.ok) {
    throw new Error("Error al eliminar el tratamiento");
  }
}
