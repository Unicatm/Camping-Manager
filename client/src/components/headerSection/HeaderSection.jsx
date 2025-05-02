function HeaderSection({ title, subtitle, children }) {
  return (
    <div className="flex justify-between items-center">
      <div className="pb-8 text-blue-950">
        <h2 className="font-bold text-xl pb-1">{title}</h2>
        <p className="text-md text-blue-950/60 pb-1">{subtitle}</p>
      </div>

      {children}
    </div>
  );
}

export default HeaderSection;
