import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import ResponsiveMenu from "./ResponsiveMenu";

type Props = {};

export const links = [
  {
    id: 1,
    title: "home",
    path: "/",
  },
  {
    id: 2,
    title: "Banking services",
    path: "/banking-services",
  },
  {
    id: 3,
    title: "Career",
    path: "/career",
  },
  {
    id: 4,
    title: "Contact",
    path: "/contact",
  },
];

const Navbar = (props: Props) => {
  // side menu state

  const [isActive, setActive] = useState(false);

  return (
    <>
      <nav className="h-[80px] fixed top-0 z-30  bg-neutral-100 right-0 left-0  mx-auto  px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link to="/" className="tracking-widest font-sans text-blue-950">
            INT. Leo
          </Link>
        </div>

        {/* Sign in & Register */}
        <div className=" items-center gap-6 hidden lg:flex">
          {/* links */}
          <div className="space-x-6 hidden md:block">
            {links.map((link) => (
              <Link
                to={link.path}
                key={link.id}
                className="font-sans font-light capitalize hover:font-medium hover:underline hover:text-blue-500 transition-all ease-in"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <Link to="/login" className="text-light font-sans text-blue-500">
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-blue-500 rounded-2xl py-4 px-8 font-sans text-white"
          >
            Register
          </Link>
        </div>
        {/* menu */}
        <button
          className="block md:hidden"
          onClick={() => setActive(!isActive)}
        >
          <Menu strokeWidth={1} />
        </button>
        <ResponsiveMenu visible={isActive} changeFn={setActive} />
      </nav>
    </>
  );
};

export default Navbar;
