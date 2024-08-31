import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <div
      style={{
        background: "url('https://internationalneo.online/bg/28.jpg')",
        backgroundPosition: "center center",
      }}
      className="h-[80vh] md:h-screen"
    >
      <div className="w-full h-full bg-black/60">
        {/* container */}
        <div className="w-[90%] translate-y-1/4  md:translate-y-1/2 h-full mx-auto">
          {/* content */}
          <div className="flex flex-col gap-4 justify-center items-center">
            <p className="font-sans text-white rounded-full border border-white px-4 tracking-widest py-2">
              OUR ONLINE BANKING
            </p>
            <h4 className="md:text-6xl text-4xl  text-white text-center font-sans">
              BE <span className="underline text-blue-500">INNOVATIVE</span> NOW
            </h4>
            <p className="font-sans font-light text-center text-white md:w-[60%] mx-auto">
              Innovation objectives are goals to improve things by an order of
              magnitude. Innovation typically requires experimentation, risk
              taking and creativity. As such, innovation objectives may involve
              greater levels of uncertainty than a typical business objective
              that aims for predictable and quickly obtainable improvements.
            </p>
            {/* btn */}
            <Link
              to="/register"
              className="bg-blue-500 p-4 rounded font-sans text-white"
            >
              Open Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
