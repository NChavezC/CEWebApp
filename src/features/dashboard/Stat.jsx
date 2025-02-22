const colorClasses = {
  blue: "bg-blue-500 text-blue-200",
  green: "bg-green-500 text-green-200",
  yellow: "bg-yellow-500 text-yellow-200",
  indigo: "bg-indigo-500 text-indigo-200",
  gray: "bg-gray-500 text-gray-200",
};

function Stat({ icon, title, value, color }) {
  return (
    <div className="flex flex-col items-center p-4 m-4 bg-white shadow rounded-lg w-32 h-40">
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-full ${
          colorClasses[color] || "bg-gray-500 text-gray-200"
        }`}
      >
        <div className="flex items-center justify-center w-6 h-6">{icon}</div>
      </div>
      <h5 className="mt-2 text-sm font-semibold text-gray-500 text-center">
        {title}
      </h5>
      <p className="mt-1 text-xl font-medium text-center">{value}</p>
    </div>
  );
}

export default Stat;
