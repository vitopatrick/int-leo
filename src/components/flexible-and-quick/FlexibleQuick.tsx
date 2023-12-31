import { Link } from "react-router-dom";


const FlexibleAndQuick = () => {
  return (
    <div className="py-[3rem]">
      {/* container */}
      <section className="w-[90%] mx-auto p-4 grid grid-cols-1 md:grid-cols-2 place-items-center">
        {/* flex container */}
        <div className="space-y-6">
          <h3 className="text-3xl md:text-4xl font-semibold font-main capitalize">
            Flexible and <span className="text-blue-500"> Quick Business</span>{" "}
            Loans For You
          </h3>
          <p className="font-light font-min">
            A competitive interest rate, favourable loan conditions and expert
            advice if you need it. Our loans give you peace of mind. All you
            need to do to apply for a loan is go online.
          </p>
          <Link
            to="/register"
            className="bg-blue-500 rounded font-min font-light text-white p-4 inline-block"
          >
            Get Started
          </Link>
        </div>
        <div>
          <img src="https://internationalneo.online/bg/4.png" alt="" />
        </div>
      </section>
    </div>
  );
};

export default FlexibleAndQuick;
