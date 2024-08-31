const Hero = () => {
  return (
    <div
      style={{
        background: "url('https://internationalneo.online/bg/28.jpg')",
        backgroundPosition: "center center",
      }}
      className="h-[60vh]"
    >
      <div className="w-full h-full bg-black/60">
        {/* container */}
        <div className="w-[90%] flex justify-center items-center h-full mx-auto">
          {/* content */}
          <div className="flex flex-col gap-4 justify-center items-center">
            <h4 className="md:text-6xl text-5xl font-bold  text-white text-center font-sans">
              Banking Services
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
