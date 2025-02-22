import Logo from "./Logo";

function Header() {
  return (
    <header className="col-span-6 row-span-1 flex items-center justify-between p-4 border-b border-gray-300 uppercase tracking-wide font-semibold text-gray-700">
      <Logo />
      <div className="flex justify-between">
        <p></p>
        <ul className="flex flex-row">
          <li className="px-4">Logout</li>
          <li className="px-4">Darkmode</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
