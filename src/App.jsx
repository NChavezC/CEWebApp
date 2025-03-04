import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Pacientes from "./pages/Pacientes";
import Reserva from "./pages/Reserva";
import Tratamientos from "./pages/Tratamientos";
import PageNotFound from "./pages/PageNotFound";
import Profesionales from "./pages/Profesionales";
import Configuracion from "./pages/Configuracion";
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute"; // Import protected route

const queryClient = new QueryClient();

function App() {
  const token = localStorage.getItem("acces_token"); // Check if user is logged in

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* If token exists, redirect to dashboard, else go to login */}
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="pacientes" element={<Pacientes />} />
              <Route path="reservas" element={<Reserva />} />
              <Route path="tratamientos" element={<Tratamientos />} />
              <Route path="profesionales" element={<Profesionales />} />
              <Route path="configuracion" element={<Configuracion />} />
            </Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
