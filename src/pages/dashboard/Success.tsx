import { toDollar } from "@/lib/convertCurrency";
import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();

  return (
    <div>
      <div className="w-[90%] mx-auto lg:w-[40%] shadow-sm p-4 rounded-xl border">
        <h1 className="text-lg uppercase underline text-green-600">
          Transaction Successful
        </h1>
        <div className="space-y-5">
          <div className="flex justify-between items-center mt-4">
            <p>Amount</p>
            <p className="font-mono">{toDollar(location.state.amount)}</p>
          </div>
          <hr />
          <div className="flex justify-between items-center mt-4">
            <p>Sent To:</p>
            <p className="">{location.state.beneficiary_name}</p>
          </div>
          <hr />
          <div className="flex justify-between items-center mt-4">
            <p>Bank:</p>
            <p className="uppercase">{location.state.bankName}</p>
          </div>
          <hr />
          <div className="flex justify-between items-center mt-4">
            <p>Bank Account:</p>
            <p className="font-mono tracking-widest">
              {location.state.beneficiary_account_number}
            </p>
          </div>
          <hr />
          <div className="flex justify-between items-center mt-4">
            <p>Account Type:</p>
            <p className="">{location.state.account_type}</p>
          </div>
          <hr />
          <div className="flex justify-between items-center mt-4">
            <p>Wait Date</p>
            <p className="font-mono">2/3 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
