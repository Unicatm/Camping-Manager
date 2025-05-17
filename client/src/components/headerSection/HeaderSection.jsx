function HeaderSection({ title, subtitle, children }) {
  return (
    <div className="flex flex-col items-start pb-8 lg:pb-0 lg:justify-between lg:items-center lg:flex-row">
      <div className="pb-2 lg:pb-8 text-blue-950">
        <h2 className="font-bold text-xl pb-1">{title}</h2>
        <p className="text-md text-blue-950/60 pb-1">{subtitle}</p>
      </div>

      {children}
    </div>
  );
}

export default HeaderSection;
