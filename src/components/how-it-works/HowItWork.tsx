import { CreditCard, BanknoteIcon, Building2 } from "lucide-react";

// reasons
const reasons = [
  {
    id: 1,
    title: "Online Payments",
    subTitle:
      "Make online payments in any payment gateway using our bank. Shop seamlessly with your debit card.",
    icon: <CreditCard strokeWidth={1.3} color="#3b82f6" size={60} />,
  },
  {
    id: 2,
    title: "Loan Programms",
    subTitle:
      "We offer loans to investors and intending business men and women. Fast payments and transparent transactions.",
    icon: <Building2 strokeWidth={1.3} color="#3b82f6" size={60} />,
  },
  {
    id: 3,
    title: "Online Banking",
    subTitle:
      "We are more than just an online bank. We bank online! Trusted by many. Save money, transfer and lots more.",
    icon: <BanknoteIcon strokeWidth={1.3} color="#3b82f6" size={60} />,
  },
];

const HowItWork = () => {
  return (
    <div
      style={{
        background: "url('https://internationalneo.online/bg/bb.jpg')",
        backgroundPosition: "center center",
      }}
      className="h-auto relative mt-[80px]"
    >
      {/* overlay */}
      <div className="bg-yellow-500/80 h-full w-full">
        {/* container */}
        <div className="w-[90%] mx-auto p-4">
          <h4 className="text-center my-[2rem] font-sans text-3xl md:text-4xl font-semibold text-white">
            How <span className="text-blue-500 uppercase underline">It</span>{" "}
            Works
          </h4>
          <p className="text-center my-[2rem] font-sans font-light md:w-[50%] mx-auto text-white">
            Start banking and making profit in our platform requires no
            professional skills. In just three easy steps you are a millionaire.
          </p>
          {/* grid container */}
          <div className="grid grid-cols-1 md:grid-cols-3 my-[3rem] gap-[3rem]">
            {reasons.map((reason) => (
              <div
                key={reason.id}
                className="flex flex-col items-center justify-center gap-4 bg-white py-6 px-4 rounded-md"
              >
                {reason.icon}
                <div className="text-center">
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
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
