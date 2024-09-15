import SocialLinks from "./SocialLinks";
import Image from "next/image";

const FooterEnd = () => {
  return (
    <div className="border-t border-[--line-color] py-6 grid md:grid-cols-3 grid-cols-1">
      <SocialLinks />

      <p className="text-[--p-color] font-semibold text-sm text-center  md:my-0 my-4">
        © <span className="text-blue-500 font-bold">2024</span>. All rights
        reserved by FurniSty.
      </p>
      <div className="flex md:justify-end justify-center items-center gap-4">
        <p className="text-sm text-[--p-color]">Accept For</p>
        <Image
          src={"/icons/cart-1.webp"}
          width={20}
          height={20}
          alt=""
          loading="lazy"
        />
        <Image
          src={"/icons/cart-2.webp"}
          width={30}
          height={30}
          alt=""
          loading="lazy"
        />
        <div className="bg-white p-1 rounded-sm">
          <Image
            src={"/icons/cart-3.webp"}
            width={30}
            height={30}
            alt=""
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default FooterEnd;
