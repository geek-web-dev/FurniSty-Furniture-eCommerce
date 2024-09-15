import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { ReactNode } from "react";
import AdminNav from "./_components/AdminNav";
import dynamic from "next/dynamic";

const AdminFooter = dynamic(() => import("./_components/AdminFooter"));

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AdminNav />
      <MaxWidthWrapper className="mt-8 ">
        <div className="relative min-h-[100vh]">{children}</div>
      </MaxWidthWrapper>
      <AdminFooter />
    </>
  );
};

export default AdminLayout;
