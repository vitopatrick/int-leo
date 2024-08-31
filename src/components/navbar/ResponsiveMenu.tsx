import { Dispatch, SetStateAction } from "react";
import { links } from "./Navbar";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  visible: boolean;
  changeFn: Dispatch<SetStateAction<boolean>>;
};

const ResponsiveMenu = ({ changeFn, visible }: Props) => {
  return (
    <AnimatePresence>
      <div
        className={
          visible
            ? "fixed h-screen w-screen bg-black/40 top-0 bottom-0 left-0 right-0"
            : "hidden"
        }
      >
        {/* side Menu */}
        <motion.div
          initial={{
            x: -999,
          }}
          animate={{
            x: 0,
          }}
          exit={{
            x: -999,
          }}
          transition={{
            duration: 0.6,
          }}
          key={visible ? 1 : 0}
          className="w-[400px] bg-slate-900 h-full relative"
        >
          {/* close menu */}
          <button
            className="  flex items-end justify-end p-4"
            onClick={() => changeFn(!visible)}
          >
            <X color="#fff" size={30} />
          </button>
          <div className="p-4 space-y-8">
            {links.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                className="block text-white font-sans capitalize text-xl font-light py-4 px-2 hover:bg-blue-500/30 rounded-md transition-all ease-in-out hover:text-blue-500"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <div className="p-4 space-y-6">
            <Link
              to="/login"
              className="block rounded-full hover:border-[2px] hover:border-blue-300 hover:text-blue-300  font-sans font-light text-blue-500 border border-blue-500 p-4 text-center text-xl "
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 p-4 rounded-full font-sans font-light text-center text-xl hover:bg-blue-700  text-white block"
            >
              Register
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
