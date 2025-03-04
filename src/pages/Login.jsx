import LoginForm from "../features/login/LoginForm";

function Login() {
  return (
    <div className="flex flex-col justify-center items-center p-4 mx-4 my-72">
      <h1 className="text-3xl m-2 p-2">Login</h1>
      <LoginForm />
    </div>
  );
}

export default Login;
