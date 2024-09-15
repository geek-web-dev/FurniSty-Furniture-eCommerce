import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { bgMap, ColorType } from "@/shared";
import Image from "next/image";
import React from "react";

type AdminCardProp = {
  title: string;
  des: string;
  svgPath?: any;
  color: ColorType;
  data: string;
};

const AdminCard = ({ title, des, data, svgPath, color }: AdminCardProp) => {
  return (
    <Card className="shadow-sm hover:shadow-md duration-500 transition-shadow border-[--line-color]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-[--title-color]">
            {title}
          </CardTitle>
          <div
            className={cn(
              "p-2 rounded-md w-14 h-14 flex justify-center items-center",
              bgMap[color]
            )}
          >
            <Image src={svgPath} width={28} height={28} alt="SVG" />
          </div>
        </div>
        <CardDescription className="text-[--sub-title]">{des}</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-[--title-color]">{data}</span>
      </CardContent>
    </Card>
  );
};

export default AdminCard;
