import {
  LayoutDashboard,
  User,
  Receipt,
  CandlestickChart,
  ArrowDownToLine,
  LogOut,
  CreditCard,
  EuroIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";

type controls = {
  isBarOpen: boolean;
};

const links = [
  {
    path: "home",
    title: "Dashboard",
    icon: <LayoutDashboard strokeWidth={2} color="#fff" />,
  },
  {
    path: "account",
    title: "Account",
    icon: <User strokeWidth={2} color="#fff" />,
  },
  {
    path: "deposit",
    title: "Online Deposit",
    icon: <Receipt strokeWidth={2} color="#fff" />,
  },
  {
    path: "transfer",
    title: "Transfer",
    icon: <CandlestickChart strokeWidth={2} color="#fff" />,
  },
  {
    path: "card",
    title: "Virtual Card",
    icon: <CreditCard strokeWidth={2} color="#fff" />,
  },
  {
    path: "withdraw",
    title: "Withdraw",
    icon: <ArrowDownToLine strokeWidth={2} color="#fff" />,
  },
  {
    path: "loan",
    title: "Loan",
    icon: <EuroIcon strokeWidth={2} color="#fff" />,
  },
];

const SideNav = () => {
  // Navigation
  const Navigation = useNavigate();

  // sign out of firebase
  const signOutOfApp = async () => {
    await signOut(auth);

    localStorage.removeItem("token");

    Navigation("/");
  };

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-blue-950 text-white sm:flex">
        <nav className="flex flex-col items-center gap-8 px-2 sm:py-5">
          {links.map((link) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={link.path}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  {link.icon}
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{link.title}</TooltipContent>
            </Tooltip>
          ))}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"ghost"}>
                <LogOut strokeWidth={1.2} />
                <span className="sr-only">Logout</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </>
  );
};

export default SideNav;
