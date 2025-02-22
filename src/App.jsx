import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Pacientes from "./pages/Pacientes";
import Reserva from "./pages/Reserva";
/* import Users from "./pages/Users"; */
import Tratamientos from "./pages/Tratamientos";
import PageNotFound from "./pages/PageNotFound";
import Profesionales from "./pages/Profesionales";
import Configuracion from "./pages/Configuracion";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="pacientes" element={<Pacientes />} />
            <Route path="reservas" element={<Reserva />} />
            {/* <Route path="users" element={<Users />} /> */}
            <Route path="tratamientos" element={<Tratamientos />} />
            <Route path="profesionales" element={<Profesionales />} />
            <Route path="configuracion" element={<Configuracion />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
