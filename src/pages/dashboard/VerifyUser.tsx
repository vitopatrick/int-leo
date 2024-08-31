import { Link, Outlet } from "react-router-dom";

type Props = {};

const VerifyUser = (props: Props) => {
  return (
    <div>
      {/* container */}
      <section className="w-[90%] mx-auto">
        {/* Header */}
        <div>
          <h4 className="font-sans text-center underline tracking-wider uppercase text-lg text-blue-400  md:text-xl">
            KYC Verification
          </h4>
          <p className="text-center font-sans font-light">
            Before you start your KYC process, see what is required of you
          </p>
        </div>
        {/* Identity verification */}
        <Link
          to="/dashboard/id-verification"
          className="block  space-y-2 font-sans p-3 border border-blue-600 bg-blue-100/10 my-[2rem] rounded-lg w-full md:w-[60%] mx-auto"
        >
          <h4 className="underline uppercase tracking-wide text-blue-500">
            Identity Verification
          </h4>
          <p className="font-light">
            You are required to take a photograph of both sides of a government
            issued Identification document
          </p>
        </Link>
        {/* Selfie Verification */}
        {/* <Link
          to="/dashboard/selfie-verification"
          className="block  space-y-2 font-sans p-3 border border-blue-600 bg-blue-100/10 my-[2rem] rounded-lg w-full md:w-[60%] mx-auto"
        >
          <h4 className="underline uppercase tracking-wide text-blue-500">
            Take A selfie
          </h4>
          <p className="font-light">
            Ensure you have good lighting as you prepare to take your selfie
          </p>
        </Link> */}
        <Outlet />
      </section>
    </div>
  );
};

export default VerifyUser;
