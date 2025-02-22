import { useState } from "react";
import { usePatchUser } from "./usePatchUser";
import { usePatchPassword } from "./usePatchPassword";
import { useAddUser } from "./useAddUser";
import { useQueryClient } from "@tanstack/react-query";

const FormularioUser = ({
  userId,
  email,
  password,
  role = "admin",
  mode,
  onCloseModal,
}) => {
  console.log(password);
  const queryClient = useQueryClient();

  const patchUserMutation = usePatchUser();

  const patchPasswordMutation = usePatchPassword({
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      onCloseModal();
    },
  });

  const addUserMutation = useAddUser({
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      onCloseModal();
    },
  });

  const [userData, setUserData] = useState({ email, role });
  const [passwordData, setPasswordData] = useState({
    presentPassword: password || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // Handles changes in email and role
  const handleUserChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Handles changes in password inputs
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit for updating user info (email, role)
  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (mode === "edit") {
      patchUserMutation.mutate(
        { userId, updatedFields: userData },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("users");
            onCloseModal();
          },
        }
      );
    } else if (mode === "add") {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
      }
      addUserMutation.mutate(
        {
          email: userData.email,
          password: passwordData.newPassword,
          role: userData.role,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("users");
            onCloseModal();
          },
        }
      );
    }
  };

  // Submit for updating password
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.currentPassword !== passwordData.presentPassword) {
      setError("Las contraseña previa no es correcta");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    patchPasswordMutation.mutate(
      { userId, passwords: passwordData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("users");
          onCloseModal();
        },
      }
    );
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <form onSubmit={handleUserSubmit} className="mb-6">
        <h2 className="text-lg font-semibold mb-2">
          {mode === "edit" ? "Editar Usuario" : "Agregar Usuario"}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleUserChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Rol</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleUserChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="admin">Administrador</option>
            <option value="recepcionista">Recepcionista</option>
          </select>
        </div>

        {/* Password Fields for "Add" Mode */}
        {mode === "add" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium">Contraseña</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </>
        )}

        {/* Success and Error Messages for User Update and Addition */}
        {patchUserMutation.isError && (
          <p className="text-red-500">
            Error al actualizar los datos del usuario
          </p>
        )}
        {patchUserMutation.isSuccess && (
          <p className="text-green-500">
            Datos del usuario actualizados con éxito
          </p>
        )}

        {addUserMutation.isError && (
          <p className="text-red-500">Error al agregar el usuario</p>
        )}
        {addUserMutation.isSuccess && (
          <p className="text-green-500">Usuario agregado con éxito</p>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          {mode === "edit" ? "Guardar Cambios" : "Agregar Usuario"}
        </button>
      </form>

      {/* Password Update Form (Edit Mode Only) */}
      {mode === "edit" && (
        <form onSubmit={handlePasswordSubmit}>
          <h2 className="text-lg font-semibold mb-2">Actualizar Contraseña</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Contraseña Actual
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Nueva Contraseña
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Confirmar Nueva Contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          {/* Success and Error Messages for Password Update */}
          {patchPasswordMutation.isError && (
            <p className="text-red-500">Error al actualizar la contraseña</p>
          )}
          {patchPasswordMutation.isSuccess && (
            <p className="text-green-500">Contraseña actualizada con éxito</p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
          >
            Cambiar Contraseña
          </button>
        </form>
      )}
    </div>
  );
};

export default FormularioUser;
