import Image from "next/image";
import Link from "next/link";

const GiftCard = ({
  imagePath,
  giftsFor,
  body,
  iconPath,
}: {
  imagePath: string;
  giftsFor: string;
  body: string;
  iconPath: string;
}) => {
  return (
    <div className="flex items-center gap-4 shadow-sm p-4 hover:shadow-md duration-200 ">
      <Image src={imagePath} width={90} height={90} alt="Gift" loading="lazy" />
      <div>
        <h3 className="text-lg flex items-center gap-2 font-semibold text-[--sub-title]">
          Gifts for your {giftsFor}
          <Image src={iconPath} width={30} height={30} alt="Gift" />
        </h3>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default GiftCard;
