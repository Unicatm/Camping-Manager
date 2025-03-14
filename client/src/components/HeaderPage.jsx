function HeaderPage({ path, title }) {
  return (
    <div className="pb-8 text-blue-950">
      <p className="font-medium text-sm text-blue-950/60 pb-1">
        Pagini/ {path}
      </p>
      <h2 className="font-bold text-3xl">{title}</h2>
    </div>
  );
}

export default HeaderPage;
