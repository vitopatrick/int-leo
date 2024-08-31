import { Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router-dom";
import { MenuIcon } from "lucide-react";

type controllerOptions = {
  closeBar: Dispatch<SetStateAction<boolean>>;
  isBarOpen: boolean;
};

const Header = ({ closeBar, isBarOpen }: controllerOptions) => {
  const path = useLocation();

  let pathName = path.pathname.split("/")[2];

  return (
    <div className="shadow-sm py-4 px-2">
      {/* container */}
      <div className="py-2 px-4 flex items-center justify-between">
        <h3 className="font-sans tracking-wider uppercase text-xl ">
          {pathName && pathName == "home" ? "Dashboard" : pathName}
        </h3>

        <button
          onClick={() => closeBar(!isBarOpen)}
          className="block md:hidden"
        >
          <MenuIcon />
        </button>
      </div>
    </div>
  );
};

export default Header;
