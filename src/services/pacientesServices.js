export async function getPacientes() {
  const respuesta = await fetch("http://localhost:8000/pacientes");
  if (!respuesta.ok) {
    throw new Error("Error al obtener los pacientes");
  }
  const data = await respuesta.json();
  return data;
}

export async function addPaciente(data) {
  const respuesta = await fetch("http://localhost:8000/pacientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!respuesta.ok) {
    throw new Error("Error al agregar el paciente");
  }

  return await respuesta.json();
}

export async function patchPaciente(pacienteId, updatedFields) {
  const filteredFields = Object.fromEntries(
    Object.entries(updatedFields).filter(
      ([_, value]) => value !== undefined && value !== ""
    )
  );
  console.log(`For paciente ${pacienteId}`, filteredFields);
  if (Object.keys(filteredFields).length === 0) {
    throw new Error("No hay datos para actualizar");
  }
  const respuesta = await fetch(
    `http://localhost:8000/pacientes/${pacienteId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredFields),
    }
  );
  if (!respuesta.ok) {
    throw new Error("Error al actualizar los datos del paciente");
  }
  return await respuesta.json();
}

export async function deletePaciente(id) {
  const respuesta = await fetch(`http://localhost:8000/pacientes/${id}`, {
    method: "DELETE",
  });

  if (!respuesta.ok) {
    throw new Error("Error al eliminar el paciente");
  }
}
