import { cn } from "@/lib/utils";
import { bgMap, colorMap, ColorType } from "@/shared";
import Image from "next/image";

const BadgeImage = ({
  color,
  title,
  imageSrc,
  size = 24,
}: {
  color: ColorType;
  title: string;
  imageSrc: string;
  size?: number;
}) => {
  return (
    <div className="flex items-center">
      <div
        className={cn(
          "p-2 flex justify-center items-center rounded-lg w-12 h-12",
          bgMap[color]
        )}
      >
        <Image src={imageSrc} width={size} height={size} alt={title} />
      </div>
      <h3
        className={cn(
          colorMap[color],
          "ml-4 font-semibold text-lg uppercase tracking-wider"
        )}
      >
        {title}
      </h3>
    </div>
  );
};

export default BadgeImage;
