import MiddleNav from "./MiddleNav";

function SideNav() {
  return (
    <div className="flex flex-col min-w-fit h-full w-1/6 divide-y-1 divide-blue-950/20">
      <h1 className="text-2xl text-left font-black text-blue-950 pl-6 pb-8 pt-8">
        Dan Pescarul
      </h1>
      <MiddleNav />
    </div>
  );
}

export default SideNav;
