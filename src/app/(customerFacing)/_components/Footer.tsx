import MaxWidthWrapper from "../../../components/common/MaxWidthWrapper";
import { Mail, Phone } from "lucide-react";
import ShowList from "../../../components/common/ShowList";
import { accountList, quickLinks } from "@/config";
import Image from "next/image";
import dynamic from "next/dynamic";

const FooterEnd = dynamic(() => import("@/components/common/FooterEnd"));
const FooterLink = dynamic(() => import("@/components/common/FooterLink"));

const Footer: React.FC = () => {
  return (
    <div className="mt-8">
      <MaxWidthWrapper>
        {/* flex justify-between */}
        <div className="border-t border-[--line-color] py-6  grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-xl mb-4 text-[--sub-title]">
              Support
            </h3>
            <p className="text-[--p-color]">
              492 Market Street, Las Vegas, LA 51626, United States.
            </p>
            <ul className="mt-4 space-y-4">
              {/*  */}
              <li className="flex items-center gap-2 flex-wrap">
                <Mail
                  className="pointer-events-none opacity-50"
                  strokeWidth={1.15}
                />
                <FooterLink href="" name="example@domain.com" margin="mt-0" />
              </li>
              <li className="flex items-center gap-2 flex-wrap">
                <Phone
                  className="pointer-events-none opacity-50"
                  strokeWidth={1.15}
                />

                <FooterLink href="" name="(+02) 887-567-5245" margin="mt-0" />
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-4 text-[--sub-title]">
              Quick Link
            </h3>
            <ShowList
              list={quickLinks}
              renderItem={(item) => <FooterLink {...item} />}
            />
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-4 text-[--sub-title]">
              Account
            </h3>
            <div className="felx flex-col">
              <ShowList
                list={accountList}
                renderItem={(item) => <FooterLink {...item} />}
              />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-4 space-y-2 text-[--sub-title]">
              Download App
            </h3>
            <p className="text-[--p-color] mb-4">
              Save $3 With App & New User only
            </p>
            <Image src="/QR_code.jpg" width={100} height={100} alt="QR Code" />
          </div>
        </div>
        <FooterEnd />
      </MaxWidthWrapper>
    </div>
  );
};

export default Footer;
