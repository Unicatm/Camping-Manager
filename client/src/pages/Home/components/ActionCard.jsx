import React from "react";
import { colorClasses } from "./colorClasses";

export default function ActionCard({
  title,
  subtitle,
  icon: Icon,
  color,
  handleClick,
  ...props
}) {
  const c = colorClasses[color] || colorClasses.blue;
  return (
    <div onClick={handleClick} className="group h-min">
      <div
        className={`${props.display} group bg-linear-to-r h-full p-6 ${props.grid} ${c.bg} ${c.hover} rounded-xl lg:p-6 xl:h-fit flex items-center space-x-4 cursor-pointer transition-colors duration-300 ease-in-out hover:transition-colors hover:duration-300 hover:ease-in-out`}
      >
        <div className={`${c.iconBg} rounded-lg p-2`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <div>
          <div className="text-white font-semibold text-md">{title}</div>
          <div className={`${c.subtitle} text-sm`}>{subtitle}</div>
        </div>
      </div>
    </div>
  );
}
