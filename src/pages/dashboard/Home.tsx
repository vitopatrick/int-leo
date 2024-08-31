import BalanceSummary from "@/components/ui/BalanceSummary";
import TransactionsList from "../../components/ui/TransactionsList";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="w-full">
      {/* container */}
      <section className="">
        {/* balance Summary */}
        <BalanceSummary />
        <TransactionsList />
      </section>
    </div>
  );
};

export default Home;
