export async function getProfesionales() {
  const respuesta = await fetch("http://localhost:8000/profesionales");
  if (!respuesta.ok) {
    throw new Error("Error al obtener los profesionales");
  }
  const data = await respuesta.json();
  return data;
}

export async function addProfesional(data) {
  const respuesta = await fetch("http://localhost:8000/profesionales", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!respuesta.ok) {
    throw new Error("Error al agregar al profesional");
  }

  return await respuesta.json();
}

export async function patchProfesional(profesionalId, updatedFields) {
  const filteredFields = Object.fromEntries(
    Object.entries(updatedFields).filter(
      ([_, value]) => value !== undefined && value !== ""
    )
  );
  console.log(`For profesional ${profesionalId}`, filteredFields);
  if (Object.keys(filteredFields).length === 0) {
    throw new Error("No hay datos para actualizar");
  }
  const respuesta = await fetch(
    `http://localhost:8000/profesionales/${profesionalId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredFields),
    }
  );
  if (!respuesta.ok) {
    throw new Error("Error al actualizar los datos del profesional");
  }
  return await respuesta.json();
}

export async function deleteProfesional(id) {
  const respuesta = await fetch(`http://localhost:8000/profesionales/${id}`, {
    method: "DELETE",
  });

  if (!respuesta.ok) {
    throw new Error("Error al eliminar al profesional");
  }
}
