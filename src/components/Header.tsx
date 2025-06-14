
import GlobalNav from "./GlobalNav";

const Header = () => {
  // Only the sticky nav is needed now
  return (
    <>
      <GlobalNav />
      {/* Ensure nav does not cover content */}
      <div className="h-[74px] md:h-[66px]" />
    </>
  );
};

export default Header;
