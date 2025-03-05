function TableHead({ heads }) {
  return (
    <thead className="text-xs text-white uppercase bg-blue-700/80">
      <tr>
        {heads.map((th, index) => (
          <th key={index} scope="col" className="px-6 py-3">
            {th.title}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
