import { Outlet } from "react-router-dom";
import SideNav from "../../components/sideNav/SideNav";
import { useFetchUser } from "../../hooks/useFetchUser";
import { useAuth } from "../../hooks/useAuth";
import LoadingModal from "../../components/ui/LoadingModal";

import { TooltipProvider } from "@/components/ui/tooltip";
import MobileSideNav from "@/components/sideNav/MobileSideNav";
import { toDollar } from "@/lib/convertCurrency";

type Props = {};

const Dashboard = (props: Props) => {
  const { userState: user, loading }: any = useFetchUser();

  useAuth();

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <SideNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="stick lg:p-4 p-6 top-0 z-30 flex h-14 items-center gap-4  bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent justify-between border-b-2 ">
            <div>Int. Leo</div>
            <div>
              {user && (
                <div>
                  <h3 className="font-bold uppercase text-lg">{user?.name}</h3>
                  <h4 className="font-mono">
                    Balance: {toDollar(user?.accountBalance)}
                  </h4>
                </div>
              )}
            </div>
          </header>
          <main className=" p-4 ">
            {loading ? (
              <>
                <LoadingModal isOpen={loading} />
              </>
            ) : (
              user && <Outlet />
            )}
          </main>
        </div>
        <MobileSideNav />
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;
