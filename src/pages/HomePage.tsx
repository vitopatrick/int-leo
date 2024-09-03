import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import UnderstandUs from "../components/understand-us/UnderstandUs";
import FlexibleAndQuick from "../components/flexible-and-quick/FlexibleQuick";
import HowItWork from "../components/how-it-works/HowItWork";
import OurServices from "../components/services/OurServices";
import Hero from "../components/hero/Hero";
import { useChatSupport } from "../hooks/useChatSupport";

type Props = {};

const HomePage = (props: Props) => {

  useChatSupport();

  return (
    <>
      {/* navigation bar */}
      <Navbar />
      {/* hero */}
      <Hero />
      {/* Our Services */}
      <OurServices />
      {/* How it works */}
      <HowItWork />
      {/* flexible & Quick */}
      <FlexibleAndQuick />
      {/* understand Us */}
      <UnderstandUs />
      {/* footer */}
      <Footer />
    </>
  );
};

export default HomePage;
