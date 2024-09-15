import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import Navbar from "@/components/nav/Navbar";

import { ReactNode, Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "../loading";

const Footer = dynamic(() => import("./_components/Footer"));

const Customerlayout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh)] overflow-x-hidden">
        <MaxWidthWrapper className="my-8">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </MaxWidthWrapper>
      </div>

      <Footer />
    </>
  );
};

export default Customerlayout;
