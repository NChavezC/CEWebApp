import { useState } from "react";
import { useGetToken } from "./useGetToken";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const getTokenMutation = useGetToken();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const formBody = new URLSearchParams();
    formBody.append("grant_type", "password"); // Required by OAuth2PasswordRequestForm
    formBody.append("username", formData.email);
    formBody.append("password", formData.password);
    formBody.append("scope", ""); // Required field, even if empty
    formBody.append("client_id", ""); // Usually empty unless required
    formBody.append("client_secret", ""); // Usually empty unless required
    getTokenMutation.mutate(formBody, {
      onSuccess: (data) => {
        const token = data.access_token;
        if (token) {
          // Store token securely (localStorage/sessionStorage for now)
          localStorage.setItem("access_token", token);
          // Redirect user to protected route
          navigate("/dashboard");
        } else {
          console.error("No access token received.");
        }
      },
      onError: (err) => console.log("Failed to retrieve user token", err),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-lg shadow-md w-[40%] mx-auto flex flex-col justify-center"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="w-[50%] py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        disabled={getTokenMutation.isLoading}
      >
        {getTokenMutation.isLoading ? "Login In..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
