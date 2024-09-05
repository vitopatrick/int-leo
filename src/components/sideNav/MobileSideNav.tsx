import {
  LayoutDashboard,
  User,
  Receipt,
  CandlestickChart,
  ArrowDownToLine,
  LogOut,
  CreditCard,
  EuroIcon,
  ChevronUp,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const links = [
  {
    path: "home",
    title: "Dashboard",
    icon: <LayoutDashboard strokeWidth={0.9} />,
  },
  {
    path: "account",
    title: "Account",
    icon: <User strokeWidth={0.9} />,
  },
  {
    path: "deposit",
    title: "Online Deposit",
    icon: <Receipt strokeWidth={0.9} />,
  },
  {
    path: "transfer",
    title: "Transfer",
    icon: <CandlestickChart strokeWidth={0.9} />,
  },
  {
    path: "card",
    title: "Virtual Card",
    icon: <CreditCard strokeWidth={0.9} />,
  },
  {
    path: "withdraw",
    title: "Withdraw",
    icon: <ArrowDownToLine strokeWidth={0.9} />,
  },
  {
    path: "loan",
    title: "Loan",
    icon: <EuroIcon strokeWidth={0.9} />,
  },
];

const MobileSideNav = () => {
  // Navigation
  const Navigation = useNavigate();

  // sign out of firebase
  const signOutOfApp = async () => {
    await signOut(auth);

    localStorage.removeItem("token");

    Navigation("/");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-0 mb-4 left-[50%] right-[50%] rounded-full flex items-center justify-center h-[50px] w-[50px]  lg:hidden"
        >
          <ChevronUp strokeWidth={1.2} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-blue-950 text-white border-none">
        <div>
          <DrawerHeader className="text-left">
            <DrawerTitle>More Options</DrawerTitle>
            <DrawerDescription className="text-neutral-200">
              Find your way here
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4  grid grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-6">
            {links.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className="flex flex-col items-center justify-center gap-1"
              >
                {link.icon}
                <p className="font-light">{link.title}</p>
              </Link>
            ))}

            <button
              className="flex items-center justify-center flex-col gap-1"
              onClick={signOutOfApp}
            >
              <LogOut strokeWidth={0.9} />
              <p className="font-light">logout</p>
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSideNav;
