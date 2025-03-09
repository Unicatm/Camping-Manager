function TableHead({ heads, forPreview }) {
  return (
    <thead className="text-xs text-white uppercase bg-blue-700/80">
      <tr>
        {heads.map((th, index) => (
          <th key={index} scope="col" className="px-6 py-3">
            {th.title}
          </th>
        ))}
        {!forPreview ? <th scope="col" className="px-6 py-3"></th> : null}
      </tr>
    </thead>
  );
}

export default TableHead;
