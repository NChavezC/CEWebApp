import { createContext, useContext } from "react";

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        role="table"
        className="border border-gray-200 bg-gray-50 rounded-lg overflow-hidden"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      role="row"
      className={`grid gap-6 items-center p-4 bg-gray-100 border-b border-gray-300 uppercase tracking-wide font-semibold text-gray-700`}
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </div>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      role="row"
      className="grid gap-6 items-center p-3 border-b border-gray-300 last:border-b-0"
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </div>
  );
}

function Body({ data, render }) {
  if (!data.length)
    return (
      <p className="text-center text-lg font-medium my-6">
        No data to show at the moment
      </p>
    );

  return <section className="my-1">{data.map(render)}</section>;
}

function Footer({ children }) {
  return children ? (
    <footer className="bg-gray-100 flex justify-center p-3">{children}</footer>
  ) : null;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
