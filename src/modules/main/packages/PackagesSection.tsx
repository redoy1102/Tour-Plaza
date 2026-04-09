import PageHeader from "@/components/shared/PageHeader";
import Packages from "./components/Packages";
import MemberShipCTA from "./components/MemberShipCTA";

const PackagesSection = () => {
  return (
    <div className="min-h-screen bg-white pt-20">
      <PageHeader
        imgLink="https://plus.unsplash.com/premium_photo-1672759267853-533e2d24813c?q=80&w=2117&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Exclusive Packages"
        description="Elevate your stay with our curated selections of seasonal offers and
            member-only benefits."
      />
      <Packages />
      <MemberShipCTA />
    </div>
  );
};

export default PackagesSection;
