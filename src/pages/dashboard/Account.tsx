import { Banknote, Landmark, MailCheck, Phone } from "lucide-react";
import { useFetchUser } from "../../hooks/useFetchUser";
import { Link } from "react-router-dom";

type Props = {};

const Account = (props: Props) => {
  const { userState: user }: any = useFetchUser();

  console.log(user);

  return (
    <div>
      {/* account container */}
      <section className="w-[90%] mx-auto p-3">
        <div className="flex items-center gap-[2rem] flex-col">
          {user ? (
            <>
              <div className="uppercase bg-blue-50 h-[100px] w-[100px] flex items-center justify-center font-sans text-4xl rounded-full">
                {user.name.substr(0, 2)}
              </div>
              <div className="font-sans space-y-2 text-center">
                <h4 className="text-2xl capitalize">{user.name}</h4>
                {!user.verified && (
                  <Link
                    to="/dashboard/verify-user"
                    className="bg-red-400 rounded-full p-2 mt-[3rem] block font-light text-white"
                  >
                    Start Verification
                  </Link>
                )}
              </div>
            </>
          ) : (
            <>
              {" "}
              <p className="font-sans font-light text-center">loading....</p>
            </>
          )}
        </div>
        {/* account details */}
        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2rem] font-sans mt-[3rem]">
            {/* email */}
            <div className="flex items-center gap-2 bg-blue-50/50 py-4 px-2 rounded">
              <div className="bg-red-500/20 h-[80px] w-[80px] flex items-center justify-center rounded-full">
                <MailCheck color="#dc2626" size={30} strokeWidth={0.8} />
              </div>
              <div>
                <h4 className="text-lg">Email</h4>
                <p className="font-light">{user.email}</p>
              </div>
            </div>
            {/* phone number */}
            <div className="flex items-center gap-2 bg-blue-50/50 py-4 px-2 rounded">
              <div className="bg-green-700/20 h-[80px] w-[80px] flex items-center justify-center rounded-full">
                <Phone color="#15803d" size={30} strokeWidth={0.8} />
              </div>
              <div>
                <h4 className="text-lg">Telephone</h4>
                <p className="font-light">{user.phone_number}</p>
              </div>
            </div>
            {/* account Number */}
            <div className="flex items-center gap-2 bg-blue-50/50 py-4 px-2 rounded">
              <div className="bg-blue-700/20 h-[80px] w-[80px] flex items-center justify-center rounded-full">
                <Banknote color="#1d4ed8" size={30} strokeWidth={0.8} />
              </div>
              <div>
                <h4 className="text-lg">Account Number</h4>
                <p className="font-light">{user.accountNumber}</p>
              </div>
            </div>
            {/* account Type */}
            <div className="flex items-center gap-2 bg-blue-50/50 py-4 px-2 rounded">
              <div className="bg-red-900/20 h-[80px] w-[80px] flex items-center justify-center rounded-full">
                <Landmark color="#450a0a" size={30} strokeWidth={0.8} />
              </div>
              <div>
                <h4 className="text-lg">Account Type</h4>
                <p className="font-light">{user.accountType}</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="font-sans font-light text-center">loading...</p>
          </>
        )}
      </section>
    </div>
  );
};

export default Account;
