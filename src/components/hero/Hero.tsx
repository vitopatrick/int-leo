import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <div
      className="w-full lg:w-[90%] h-[80dvh] rounded-3xl  mx-auto relative"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/351264/pexels-photo-351264.jpeg?auto=compress&cs=tinysrgb&w=800')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* overlay */}
      <div className="absolute w-full top-0 bottom-0 bg-black/70 flex items-center justify-center flex-col">
        <div className="p-4 text-white space-y-4">
          <p className="">OUR ONLINE BANKING</p>
          <h4 className="text-4xl lg:text-6xl font-bold">
            BE <span className="underline text-blue-500">INNOVATIVE</span> NOW
          </h4>
          <p className="w-full lg:w-[60%]">
            Innovation objectives are goals to improve things by an order of
            magnitude. Innovation typically requires experimentation, risk
            taking and creativity. As such, innovation objectives may involve
            greater levels of uncertainty than a typical business objective that
            aims for predictable and quickly obtainable improvements.
          </p>
          {/* btn */}
          <Link
            to="/register"
            className="bg-blue-500 p-4 rounded font-sans text-white inline-block"
          >
            Open Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
