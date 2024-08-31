import { Link } from "react-router-dom";
import { useFetchUser } from "../../hooks/useFetchUser";

type Props = {};

const AccountSummary = (props: Props) => {
  const { userState: user }: any = useFetchUser();

  return (
    <div className="p-3 w-full bg-gray-50 rounded border border-slate-900/20">
      {/* text */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="flex items-center justify-center p-4 h-[50px] w-[50px] uppercase font-sans text-xl rounded-full border-[2px] border-blue-600">
              {user.name.substr(0, 2)}
            </div>
            <div className="font-sans">
              <h1 className="font-semibold tracking-wide">{user.name}</h1>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </>
        ) : (
          <>
            <p className="font-sans font-light p-3">loading ...</p>
          </>
        )}
      </div>
      {/* account number */}
      {user && (
        <>
          <div className="font-sans mt-[3rem] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="tracking-wide text-gray-500">Acct No.</h3>
              <p>{user.accountNumber}</p>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="tracking-wide text-gray-500">Status</h3>
              <Link
                to="/dashboard/verify-user"
                className={
                  user.verified
                    ? "bg-green-600/50 px-6  font-light  py-2 rounded-full"
                    : "bg-red-500/50 px-6  font-light  py-2 rounded-full"
                }
              >
                {user.verified ? "Verified" : "Not Verified"}
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountSummary;
