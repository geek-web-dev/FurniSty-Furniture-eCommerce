import StarRating from "@/components/common/StarRating";
import { CarouselItem } from "@/components/ui/carousel";
import { TriangleIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

type TestimonialCardProps = {
  name: string;
  imageSrc: string;
  rate: number;
  comment: string;
  position: string;
};

const TestimonialCard = ({
  name,
  imageSrc,
  rate,
  comment,
  position,
}: TestimonialCardProps) => {
  return (
    <CarouselItem className="sm:basis-1/2 lg:basis-1/3 basis-full">
      <div className="rounded-md select-none p-2">
        <div className="relative py-2 px-4 bg-gray-100 dark:bg-[#151515] mb-8 rounded-md shadow-sm">
          <p>{comment}</p>
          <div className="absolute border-[8px] border-transparent -bottom-[14px] left-4 border-t-gray-100 dark:border-t-[#151515]" />
        </div>
        <div className="flex justify-between items-center mr-4">
          <Image
            src={imageSrc}
            width={132}
            height={132}
            alt={name}
            loading="lazy"
            className="rounded-lg"
          />
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-[--title-color] text-lg">
              {name}
            </h3>
            <span className="text-sm text-[--sub-title]">{position}</span>
            <StarRating averageRate={rate} />
          </div>
        </div>
      </div>
    </CarouselItem>
  );
};

export default TestimonialCard;
