import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";


type Props = {};

const Card = (props: Props) => {
  return (
    <>
      <div>
        {/* header */}
        <div className="w-[90%] mx-auto p-4 flex justify-between items-center">
          <h3 className="font-sans tracking-widest uppercase underline">
            Virtual Card
          </h3>
          <Link
            to="/dashboard/create-card"
            className="bg-blue-700 p-4 rounded-md font-sans text-blue-50"
          >
            New Card
          </Link>
        </div>
        {/* body */}
        <div className="w-[90%] mx-auto p-4 text-center font-sans">
          <h4 className="text-xl font-light">No Active Card</h4>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Card;
