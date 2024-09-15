import React from "react";
import { LucideIcon } from "lucide-react";
import { cleanNumberFormat } from "@/utils/formatters";

interface FunFactProps {
  Icon: LucideIcon;
  title: string;
  des: string;
  count: number;
  color: string;
}

const FunFact: React.FC<FunFactProps> = ({
  Icon,
  title,
  des,
  count,
  color,
}) => {
  return (
    <div className="spacey-2">
      <Icon size={32} strokeWidth={1} className={`text-${color} opacity-75`} />
      <span className={`mr-2 text-${color} opacity-75 font-semibold`}>
        {cleanNumberFormat(count)}
      </span>
      <span className="text-lg">{title}</span>
      <p>{des}</p>
    </div>
  );
};

export default FunFact;
