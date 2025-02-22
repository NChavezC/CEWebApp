function Logo() {
  /*  return (
    <div className="flex items-center space-x-3 p-4">
      <img src="/Logo.jpg" alt="logo" className="w-48 h-48" />
    </div>
  ); */
  return (
    <div className="flex items-center space-x-3 p-2 m-2">
      {/* Logo Icon */}
      <div className="w-8 h-8 bg-gradient-to-r from-yellow-100 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
        <span className="text-white text-3xl font-serif">🌸</span>
      </div>

      {/* Logo Text */}
      <h1 className="text-2xl font-semibold text-gray-700 tracking-wide">
        Belleza Clínica
      </h1>
    </div>
  );
}

export default Logo;
