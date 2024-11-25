import { X } from "lucide-react";
import { toDollar } from "../../lib/convertCurrency";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useFetchTransactions } from "../../hooks/useFetchTransactions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "./badge";

type Props = {};

const TransactionsList = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTransactions, setModalTransactions] = useState();

  const { transactions } = useFetchTransactions();

  const setModalTransactionsOpen = (theTransactions: any) => {
    const transaction = transactions.find(
      (trans: any) => trans.id == theTransactions
    );

    setModalTransactions(transaction);

    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="mt-[3rem]">
        {/* header */}
        <div className="flex justify-between">
          <h3 className="font-sans uppercase underline text-blue-500">
            Recent Transactions
          </h3>
          {transactions && <Badge>{transactions.length}</Badge>}
        </div>
        {/* Body */}
        {transactions.length < 1 ? (
          <div className="mt-8">
            <p className="text-center">No Transactions Yet</p>
          </div>
        ) : (
          <Card className="my-3 py-4">
            <CardContent className="grid gap-8">
              {transactions &&
                transactions.map((transaction: any, index: number) => (
                  <div
                    className="flex items-center gap-4 border-b-[2px] py-2 border-neutral-100"
                    key={index}
                  >
                    <div className="flex flex-col gap-6">
                      <p className="text-sm font-medium leading-none">
                        {transaction.remark}
                      </p>
                      <p className="text-sm text-muted-foreground lg:space-x-4">
                        <span className="font-light font-mono tracking-wider uppercase">
                          {transaction.id.slice(0, 6)}...
                        </span>

                        <Badge variant={"outline"} className="capitalize">
                          {transaction.type}
                        </Badge>
                        {
                          <Badge
                            variant={
                              transaction.approved ? "default" : "destructive"
                            }
                          >
                            {transaction.approved ? "Approved" : "Pending"}
                          </Badge>
                        }
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <p className="font-mono">
                        {toDollar(transaction.amount)}
                      </p>
                      <p className="text-neutral-400">{transaction.date}</p>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        )}
      </div>
      <Modal open={isOpen} close={setIsOpen} transaction={modalTransactions} />
    </>
  );
};

const Modal = ({ open, close, transaction }: any) => {
  let status = false;

  return (
    <AnimatePresence>
      <div
        className={
          open
            ? "fixed left-0 right-0 bottom-0 top-0 h-screen w-screen z-50 bg-black/30 flex items-center justify-center"
            : "hidden"
        }
      >
        {/* main body */}
        {transaction && (
          <motion.main
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 1,
            }}
            key={open}
            transition={{
              duration: 0.4,
            }}
            className="bg-white md:w-[40%] w-[80%] mx-auto rounded p-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-2xl font-sans font-normal">Transaction</h4>
              <button className="p-4" onClick={() => close(!open)}>
                <X />
              </button>
            </div>
            <hr />
            {/* body */}
            <div>
              <div className="font-sans flex justify-between items-center py-3">
                <h4 className="font-light">Reference</h4>
                <p className="font-mono">{transaction.id}</p>
              </div>
              <hr />
              <div className="font-sans flex justify-between items-center py-3">
                <h4 className="font-light">Amount</h4>
                <p>{toDollar(transaction.amount)}</p>
              </div>
              <hr />
              <div className="font-sans flex justify-between items-center py-3">
                <h4 className="font-light">Status</h4>
                <p
                  className={
                    transaction.approved
                      ? "font-sans uppercase text-green-600"
                      : "font-sans uppercase text-yellow-500"
                  }
                >
                  {transaction.approved ? "approved" : "pending"}
                </p>
              </div>
              <hr />
              <div className="font-sans flex justify-between items-center py-3">
                <h4 className="font-light">Type</h4>
                <p className="font-sans">{transaction.type}</p>
              </div>
              <hr />
              <div className="font-sans flex justify-between items-center py-3">
                <h4 className="font-light">Date</h4>
                <p className="font-sans ">{transaction.date}</p>
              </div>
            </div>
          </motion.main>
        )}
      </div>
    </AnimatePresence>
  );
};

export default TransactionsList;
