// Table.jsx

const Table = ({ data }) => (
  <table className="min-w-full bg-white">
    <thead>
      <tr>
        {Object.keys(data[0] || {}).map((key) => (
          <th key={key} className="py-2 px-4 border-b">
            {key}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index} className="hover:bg-gray-100">
          {Object.values(item).map((value, idx) => (
            <td key={idx} className="py-2 px-4 border-b">
              {value}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
