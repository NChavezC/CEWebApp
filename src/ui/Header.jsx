import { HiArrowLeftStartOnRectangle } from "react-icons/hi2";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("access_token");
    navigate("/login");
  }
  return (
    <header className="col-span-6 row-span-1 flex items-center justify-between p-4 border-b border-gray-300 uppercase tracking-wide font-semibold text-gray-700">
      <Logo />
      <div className="flex justify-between">
        <p></p>
        <ul className="flex flex-row">
          <li>
            <button
              className="px-4 flex flex-row justify-between items-center"
              onClick={handleLogout}
            >
              <span className="px-2">Logout</span>
              <HiArrowLeftStartOnRectangle />
            </button>
          </li>

          <li className="px-4">Darkmode</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
