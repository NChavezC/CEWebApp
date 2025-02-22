export async function getUsers() {
  const respuesta = await fetch("http://localhost:8000/users");
  if (!respuesta.ok) {
    throw new Error("Error al obtener los usuarios");
  }
  const data = await respuesta.json();
  return data;
}

export async function addUser(data) {
  const respuesta = await fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!respuesta.ok) {
    throw new Error("Error al agregar el usuario");
  }
  return await respuesta.json();
}

export async function patchUser(userId, updatedFields) {
  const filteredFields = Object.fromEntries(
    Object.entries(updatedFields).filter(
      ([_, value]) => value !== undefined && value !== ""
    )
  );
  if (Object.keys(filteredFields).length === 0) {
    throw new Error("No hay datos para actualizar");
  }
  const respuesta = await fetch(`http://localhost:8000/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filteredFields),
  });
  if (!respuesta.ok) {
    throw new Error("Error al actualizar los datos del usuario");
  }
  return await respuesta.json();
}

export async function patchPassword(userId, passwords) {
  console.log(`PATCH Password: ${userId}`, passwords);
  if (!passwords.currentPassword || !passwords.newPassword) {
    throw new Error("Debe ingresar ambas contraseñas");
  }
  const respuesta = await fetch(`http://localhost:8000/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passwords),
  });
  if (!respuesta.ok) {
    throw new Error("Error al actualizar la contraseña");
  }
  return await respuesta.json();
}

export async function deleteUser(id) {
  const respuesta = await fetch(`http://localhost:8000/users/${id}`, {
    method: "DELETE",
  });
  if (!respuesta.ok) {
    throw new Error("Error al borrar el usuario");
  }
  return await respuesta.json();
}
