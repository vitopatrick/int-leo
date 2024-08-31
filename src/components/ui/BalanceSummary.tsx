import BalanceCard from "./BalanceCards";
import { useFetchUser } from "@/hooks/useFetchUser";

const BalanceSummary = () => {
  const { userState: user }: any = useFetchUser();

  return (
    <>
      {user && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <BalanceCard title="Balance" amount={user.accountBalance} />
          <BalanceCard title="Loan" amount={user.loanBalance} />
          <BalanceCard
            title="fixed Deposit"
            amount={user.fixedDepositBalance}
          />
        </div>
      )}
    </>
  );
};

export default BalanceSummary;
