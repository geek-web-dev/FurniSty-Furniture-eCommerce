import FooterEnd from "@/components/common/FooterEnd";
import FooterLink from "@/components/common/FooterLink";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import ShowList from "@/components/common/ShowList";
import { adminAccountList, adminQuickLinks } from "@/config";

const AdminFooter = () => {
  return (
    <div className="mt-8">
      <MaxWidthWrapper>
        <div className="border-t border-[--line-color] py-6  grid lg:grid-cols-3 sm:grid-cols-2 gap-4 ">
          <div>
            <h3 className="font-semibold text-xl mb-4 text-[--sub-title]">
              Quick Link
            </h3>
            <ShowList
              list={adminQuickLinks}
              renderItem={(item) => <FooterLink {...item} />}
            />
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-4 text-[--sub-title]">
              Account
            </h3>
            <div className="felx flex-col">
              <ShowList
                list={adminAccountList}
                renderItem={(item) => <FooterLink {...item} />}
              />
            </div>
          </div>
        </div>
        <FooterEnd />
      </MaxWidthWrapper>
    </div>
  );
};

export default AdminFooter;
