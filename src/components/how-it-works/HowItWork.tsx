import { CreditCard, BanknoteIcon, Building2 } from "lucide-react";

// reasons
const reasons = [
  {
    id: 1,
    title: "Online Payments",
    subTitle:
      "Make online payments in any payment gateway using our bank. Shop seamlessly with your debit card.",
    icon: <CreditCard strokeWidth={1} color="#fff" size={40} />,
  },
  {
    id: 2,
    title: "Loan Programms",
    subTitle:
      "We offer loans to investors and intending business men and women. Fast payments and transparent transactions.",
    icon: <Building2 strokeWidth={1} color="#fff" size={40} />,
  },
  {
    id: 3,
    title: "Online Banking",
    subTitle:
      "We are more than just an online bank. We bank online! Trusted by many. Save money, transfer and lots more.",
    icon: <BanknoteIcon strokeWidth={1} color="#fff" size={40} />,
  },
];

const HowItWork = () => {
  return (
    <div className="bg-blue-900">
      {/* container */}
      <div className="w-[90%] mx-auto flex justify-between items-center gap-8 ">
        {/* reasons */}
        <div className="space-y-8 flex-1 p-4">
          {reasons.map((reason) => (
            <div key={reason.id} className=" bg-blue-50 p-3 rounded-xl">
              <div className="bg-blue-600/40 p-3 flex items-center justify-center h-[60px] w-[60px] rounded-full">
                {reason.icon}
              </div>
              <div className="">
                <h4 className="font-sans capitalize my-4 font-semibold">
                  {reason.title}
                </h4>
                <p className="font-sans font-light capitalize text-sm">
                  {reason.subTitle}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* image */}
        <div className="flex-1 hidden lg:block">
          <img
            src="https://elitefinancialhub.org/static/media/home-header.ea2b311d3df9c798bdd0.webp"
            alt="happy person"
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
