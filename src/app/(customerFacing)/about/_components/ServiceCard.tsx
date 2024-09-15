import { LucideIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

type ServiceCardProps = {
  title: string;
  des: string;
  ImageSrc: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, des, ImageSrc }) => {
  return (
    <div className="border border-gray-100 dark:border-[#333] p-4 rounded-md space-y-2 flex flex-col shadow-md hover:shadow-lg duration-100">
      <Image src={ImageSrc} width={50} height={50} alt={title} loading="lazy" />
      <h3 className="ml-1 text-lg font-semibold">{title}</h3>
      <p className="ml-1">{des}</p>
    </div>
  );
};

export default ServiceCard;
