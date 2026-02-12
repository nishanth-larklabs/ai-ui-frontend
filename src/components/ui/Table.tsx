interface TableProps {
  columns?: string[];
  data?: string[][];
}

const Table = ({
  columns = [],
  data = [],
}: TableProps) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        {columns.length > 0 && (
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-gray-100">
          {data.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className="hover:bg-gray-50 transition-colors"
            >
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="px-4 py-3 text-gray-700"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length || 1}
                className="px-4 py-8 text-center text-gray-400"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
